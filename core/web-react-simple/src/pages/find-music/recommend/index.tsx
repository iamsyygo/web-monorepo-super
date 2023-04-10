import { memo, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import { Button, Divider, Space, Tag } from 'antd';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  CaretDownOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';
import 'swiper/css';
import 'swiper/css/pagination';

import styles from './index.module.scss';
import { findBanner } from '@/api/find.api';
import { BannerList } from './types';
console.log(styles, 'styles');

export default memo(() => {
  const [bannerList, setBannerList] = useState<BannerList[]>([]);
  const [activeBgImg, setActiveBgImg] = useState<string>('');
  const [moreFollowheight, setMoreFollowheight] = useState<number>(0);

  useEffect(() => {
    findBanner(0).then(({ banners }) => {
      setBannerList(banners);
      setActiveBgImg(banners[0]?.imageUrl);
    });
  }, []);

  const handleSlideChange = (swiper: any) => {
    const { realIndex } = swiper;
    setActiveBgImg(bannerList[realIndex]?.imageUrl);
  };
  const handleMoreFollowHeight = () => {
    setMoreFollowheight(moreFollowheight === 0 ? 100 : 0);
  };

  return (
    <div className={styles['app-recommend-container']}>
      <div
        className="banner-swiper-virtualization-container"
        style={{
          backgroundImage: `url(${activeBgImg})`,
        }}
      ></div>
      <Swiper
        className="banner-swiper-container"
        navigation={true}
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        pagination={{
          dynamicBullets: true,
        }}
        effect={'cards'}
        loop={true}
        autoplay={{
          delay: 3000,
          stopOnLastSlide: true,
          disableOnInteraction: true,
        }}
        onSlideChange={handleSlideChange}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {bannerList.map((item) => {
          return (
            <SwiperSlide key={item.encodeId}>
              <img
                className="banner-swiper-item--img"
                src={item.imageUrl}
                alt=""
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div
        className="personal-data-container"
        style={{
          height: `${145 + moreFollowheight}px`,
        }}
      >
        <div className="user-avatar">
          <img src="" alt="" />
        </div>
        <h3># xndncdn</h3>
        <div className="introduce-container">
          <Tag color="#108ee9">30 关注</Tag>
          <Tag color="#DC226C">30 粉丝</Tag>
          <Tag color="#6AD465">Lv.9</Tag>
        </div>
        <div className="introduce-container">
          <Tag icon={<EnvironmentOutlined />} color="#808286">
            IP属地:广东
          </Tag>
          <Tag color="#808286">广东 湛江</Tag>
          <Tag color="#808286">村龄5年</Tag>
        </div>
        <div
          className="more-follow-container"
          style={{ height: `${moreFollowheight}px` }}
        >
          <Swiper
            slidesPerView={4.3}
            spaceBetween={20}
            modules={[Autoplay, Pagination]}
            autoplay={{
              delay: 3000,
              stopOnLastSlide: true,
              disableOnInteraction: true,
            }}
          >
            {bannerList.map((item) => {
              return (
                <SwiperSlide key={item.encodeId}>
                  <div className="gz-card">
                    <img src="http://p4.music.126.net/Dywx9E-W3ywqtSHM5I4PQw==/109951166539600998.jpg?param=34y34" />
                    <span>sss</span>
                    <Button
                      type="primary"
                      size="small"
                      shape="round"
                      style={{
                        height: '18px',
                        lineHeight: '18px',
                        fontSize: '12px',
                      }}
                    >
                      关注
                    </Button>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className="more-user-data" onClick={handleMoreFollowHeight}></div>
      </div>
    </div>
  );
});
