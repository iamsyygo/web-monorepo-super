import { computed, defineComponent, ref, toRefs, unref } from 'vue';
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElRow,
  ElCol,
  FormItemProp,
  FormInstance,
  ElDatePicker,
  ElSelect,
  ElOption,
  ElRadio,
  ElRadioGroup,
  ElCheckbox,
  ElCheckboxGroup,
  ElSwitch,
} from 'element-plus';
// import {} from '@vue/shared';
import { FormItem, Props, Span, DFormEmits } from './type';
import { getSlotValue, hasSlot } from '@/utils';
// import moduleCss from './index.module.scss';

export default defineComponent({
  name: 'd-form',
  components: {
    ElForm,
    ElFormItem,
    ElInput,
    ElRow,
    ElCol,
    ElDatePicker,
    ElSelect,
    ElOption,
    ElRadio,
    ElRadioGroup,
    ElCheckbox,
    ElCheckboxGroup,
    ElSwitch,
  },
  props: Props,
  emits: DFormEmits,
  setup(props, { slots, attrs, emit, expose }) {
    const { gutter, spans, formItems, renderFormItem, modelValue } =
      toRefs(props);
    const elformRef = ref<null | FormInstance>(null);

    // 表单数据模型,保证单向数据流
    const formModel = computed({
      get() {
        const model = unref(formItems).reduce((acc, item: FormItem) => {
          if (item.prop) {
            acc[item.prop] = modelValue.value?.[item.prop] ?? item.defaultValue;
          }
          return acc;
        }, {} as Record<string, any>);

        const proxy = new Proxy(model, {
          set(target, key, value) {
            emit('update:modelValue', { ...target, [key]: value });
            return true;
          },
        });

        return proxy;

        // return { ...model };
      },
      set(val) {
        emit('update:modelValue', val);
      },
    });

    // 获取默认插槽内容， slot>slot1,slot2,slot3>type>formItems(slot)
    const getDefalutSlot = slots['formItems'];

    // 按钮的插槽 TODO: 待优化...
    const buttonSlotName =
      hasSlot('button-block', slots) ||
      hasSlot('button-inline', slots) ||
      hasSlot('button-right', slots);
    const buttonSlot =
      buttonSlotName == 'button-block'
        ? {
            prop: buttonSlotName,
            'label-width': '0px',
            span: 24,
          }
        : buttonSlotName == ''
        ? []
        : { prop: buttonSlotName, 'label-width': '0px', span: spans.value };

    // 获取表单
    const getFormItem = (item: FormItem) => {
      let result: any = getSlotValue(item.prop || '', slots);
      if (result) return result({ formItem: item, formModel: formModel.value });

      switch (item.type) {
        case 'input':
          result = (
            <el-input
              v-model={formModel.value[item.prop || '']}
              placeholder={item.placeholder}
            />
          );
          break;

        case 'radio':
          result = (
            <el-radio-group v-model={formModel.value[item.prop || '']}>
              {item.options?.map((option) => (
                <el-radio key={option.value} label={option.value}>
                  {option.label}
                </el-radio>
              ))}
            </el-radio-group>
          );
          break;

        case 'checkbox':
          result = (
            <el-checkbox-group v-model={formModel.value[item.prop || '']}>
              {item.options?.map((option) => (
                <el-checkbox key={option.value} label={option.value}>
                  {option.label}
                </el-checkbox>
              ))}
            </el-checkbox-group>
          );
          break;

        case 'select':
          result = (
            <el-select v-model={formModel.value[item.prop || '']}>
              {item.options?.map((option) => (
                <el-option
                  key={option.value}
                  label={option.label}
                  value={option.value}
                />
              ))}
            </el-select>
          );
          break;

        case 'textarea':
          result = (
            <el-input
              type="textarea"
              v-model={formModel.value[item.prop || '']}
              autosize={{ minRows: 1 }}
              placeholder={item.placeholder}
            />
          );
          break;

        case 'switch':
          result = <el-switch v-model={formModel.value[item.prop || '']} />;
          break;

        default:
          result =
            // 日期
            [
              'year',
              'month',
              'date',
              'dates',
              'week',
              'datetime',
              'datetimerange',
              'daterange',
              'monthrange',
            ].includes(item.type || '') ? (
              <el-date-picker
                type={item.type}
                placeholder={item.placeholder}
                {...item.options}
                v-model={formModel.value[item.prop || '']}
              />
            ) : (
              getDefalutSlot?.({ formItem: item, formModel: formModel.value })
            );

          break;
      }
      return result;
    };

    // 获取珊格布局 Span | number  -> { xs: number, sm: number, md: number, lg: number, xl: number }
    const getSpans = (span: Span | number | undefined) => {
      if (typeof span === 'number') {
        return { xs: span, sm: span, md: span, lg: span, xl: span };
      }
      if (!span && typeof spans.value === 'number') {
        return {
          xs: spans.value,
          sm: spans.value,
          md: spans.value,
          lg: spans.value,
          xl: spans.value,
        };
      }
      return span || spans.value || {};
    };

    // onMounted(() => {});
    const getElForm = () => {
      return elformRef.value;
    };
    expose({
      getElForm,
    });

    return () => (
      <el-form
        {...props}
        onValidate={(prop: FormItemProp, isValid: boolean, message: string) =>
          emit('validate', prop, isValid, message)
        }
        ref={elformRef}
        model={formModel.value}
      >
        <el-row gutter={gutter.value}>
          {formItems.value.concat(buttonSlot).map((item) => {
            // 是否渲染
            if (
              renderFormItem.value &&
              !renderFormItem.value(item, { ...formModel.value })
            ) {
              return;
            }

            // 如果有 required 属性，添加必填校验
            const required = item.required || props.required;
            const rules =
              (Array.isArray(item.rules) && item.rules) || // 返回数组
              (item.rules && [item.rules]) || // 返回对象
              [];
            required &&
              rules.push({
                required: true,
                message: `${item.label}是必填项`,
              });

            return (
              <el-col key={item.prop} {...getSpans(item.span)}>
                <el-form-item
                  {...item}
                  rules={rules}
                  // class={moduleCss['base-form-item']}
                >
                  {getFormItem(item)}
                </el-form-item>
              </el-col>
            );
          })}
        </el-row>
      </el-form>
    );
  },
});
