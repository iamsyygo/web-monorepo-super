<template>
  <layout>
    <template #header>
      <div class="base-app-header">
        <div class="app-logo-title">
          <img src="/logo.svg" alt="logo" />
          <div>Dev</div>
        </div>

        <div class="app-setting">
          <el-dropdown trigger="click" @command="hanlderClickDropdown">
            <span class="setting-settings__eas">
              <d-icon name="settings__eas" :size="17"></d-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  ><d-icon name="conference_call" command="/preData"> </d-icon>
                  <span class="setting-title">个人信息</span></el-dropdown-item
                >
                <el-dropdown-item command="/updateLog"
                  ><d-icon name="planner"> </d-icon
                  ><span class="setting-title">更新日志</span></el-dropdown-item
                >
                <el-dropdown-item command="outLogin"
                  ><d-icon name="key"> </d-icon
                  ><span class="setting-title">退出登录</span></el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </template>
    <template #aside>
      <div class="base-app-aside"></div>
    </template>
    <template #main
      ><router-view v-slot="{ Component }">
        <Transition
          enter-active-class="animate__animated animate__fadeInLeft"
          leave-active-class="animate__animated animate__fadeOutRight"
        >
          <component :is="Component" />
        </Transition>
      </router-view>
    </template>
  </layout>
</template>

<script setup lang="ts">
import layout from './layout.vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const hanlderClickDropdown = (command: string) => {
  console.log(command, 'command');

  if (command === '/updateLog') {
    router.push(command);
  }
};
</script>

<style scoped lang="scss">
.base-app-header {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.app-logo-title {
  padding: 0 var(--app-base-padding);
  display: flex;
  align-items: center;

  img {
    height: 60%;
    will-change: filter;
    transition: filter 300ms;
  }
  img:hover {
    filter: drop-shadow(0 0 2em #71a0f0);
  }
  div {
    margin-left: 10px;
    font-size: 26px;
    font-weight: 900;
    font-style: italic;
    text-shadow: 0 0 2px var(--el-color-primary);
  }
}
.app-setting {
  padding: 0 calc(var(--app-base-padding) * 2);
  display: flex;
  align-items: center;
  cursor: pointer;
}
.setting-settings__eas {
  background-color: #ebede9;
  padding: calc(var(--app-base-padding) / 2);
  border-radius: 50%;
  &:hover {
    transform: rotate(360deg);
    transition: all 1s ease-in-out;
  }
}
.setting-title {
  margin-left: 3px;
}
.base-app-aside {
  background-color: #71a0f0;
  width: 100%;

  height: 100%;
}
</style>
