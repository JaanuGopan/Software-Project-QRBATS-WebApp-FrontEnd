import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import slide_image_1 from "../../assets/Images/homepage_pic/Designer.jpeg";
import slide_image_0 from "../../assets/Images/homepage_pic/Designer_pic1.jpeg";
import slide_image_2 from "../../assets/Images/homepage_pic/Designer (1).jpeg";
import slide_image_3 from "../../assets/Images/homepage_pic/Designer (2).jpeg";
import slide_image_4 from "../../assets/Images/homepage_pic/Designer (3).jpeg";
import "./ImageSlide.css";

const HomePageFirstContainerImageSlide = () => {
  return (
    <div className="HomePageFirstContainer-image-slide">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="image-slide-content">
            <img src={slide_image_0} alt="Slide 1" />
            <label>
              The lecturer can create a timetable for lectures and generate QR
              codes for them.
            </label>
            <div className="sized-box"></div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="image-slide-content">
            <img src={slide_image_4} alt="Slide 2" />
            <label>
              Students can scan the QR-code to mark their attendance using
              SkyTicker mobile app.
            </label>
            <div className="sized-box"></div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="image-slide-content">
            <img src={slide_image_3} alt="Slide 3" />
            <label>
              When students mark their attendance, they will get notification.
            </label>
            <div className="sized-box"></div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="image-slide-content">
            <img src={slide_image_2} alt="Slide 4" />
            <label>Admin user can manage students and lectures accounts.</label>
            <div className="sized-box"></div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HomePageFirstContainerImageSlide;
