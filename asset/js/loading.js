gsap.defaults({
  ease: 'none',
});
const lenis = new Lenis();

lenis.on('scroll', (e) => {
  console.log(e);
});

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);
$('.menu-toggler_icon_item.-close').hide();

window.onload = function () {
  const loadingLogoElement = $('#loadingLogo');
  const animationPath = loadingLogoElement.data('path'); // Lottie 애니메이션 JSON 경로

  // Lottie 로드
  const loadingAnimation = lottie.loadAnimation({
    container: loadingLogoElement[0], // jQuery 객체를 DOM 요소로 변환
    renderer: 'svg', // 렌더링 방식
    loop: false,
    autoplay: true,
    path: animationPath, // JSON 파일 경로
  }); //lottie load

  // Lottie 완료 후 실행
  loadingAnimation.addEventListener('complete', function () {
    $('.loading').css('animation', 'loading 1s forwards');
  }); //loadingAnimation
  $('.loading').one('animationend', function () {
    $(this).remove();
    gsap.to('.intro .headline .char',{filter:'blur(0)',opacity:1,stagger:.02})
    gsap.to('.intro .intro__video .thumb',{height:'100%'})
    $('.intro__scroll').css('--transform', 'scale3d(1, 1, 1)');
    $('.menu-toggler').on('click', function () {
      if (!$('.header').find('.sub-menu').hasClass('on')) {
        $(this).addClass('active');
        $('.menu-toggler_icon_item.-open').hide();
        $('.menu-toggler_icon_item.-close').show();
        $('.sub-menu').addClass('on');
        $('.menu-toggler_label_item').addClass('open');
        $('body').addClass('dimmed');
      } else {
        $(this).removeClass('active');
        $('.menu-toggler_icon_item.-open').show();
        $('.menu-toggler_icon_item.-close').hide();
        $('.sub-menu').removeClass('on');
        $('.menu-toggler_label_item').removeClass('open');
        $('body').removeClass('dimmed');
      }
    });
    $(document).click(function (e) {
      // 문서 내에 클릭 이벤트 발생할때 실행
      console.log(e.target); // 클릭된 요소 콘솔에 출력
      if (!$('header').has(e.target).length) {
        // 클릭된 요소를 자식으로 포함하고 있는지
        $('.sub-menu').removeClass('on');
        $('body').removeClass('dimmed');
        $('.menu-toggler_icon_item.-open').show();
        $('.menu-toggler_icon_item.-close').hide();
        $('.menu-toggler_label_item').removeClass('open');
      }
    });
    $(window).scroll(function (e) {
      const scrollTop = $(this).scrollTop();
      // console.log(scrollTop)
      if (scrollTop >= 200) {
        $('header').addClass('scroll');
      } else {
        $('header').removeClass('scroll');
      }
    });
    //star

    let lastScrollTop = 0;
    let lastTime = Date.now();
    let scrollTimeout; // 스크롤 멈춤 감지를 위한 타이머

    const starShape = gsap.timeline({
      scrollTrigger: {
        trigger: '.star',
        start: 'top 50%',
        end: 'bottom bottom',
        markers: false,
        scrub: 2,
        onUpdate: (self) => {
          const currentScrollTop = self.scroll(); // 현재 스크롤 위치
          const currentTime = Date.now(); // 현재 시간

          const deltaScroll = currentScrollTop - lastScrollTop; // 스크롤 위치 변화량
          const deltaTime = currentTime - lastTime; // 시간 변화량

          const scrollSpeed = deltaScroll / deltaTime; // 스크롤 속도 계산

          // 스크롤 강도에 따른 y 값 설정
          const moveDistance = scrollSpeed; // 속도에 따라 움직임의 크기 설정
          console.log(moveDistance * 30);
          // 스크롤 중 y 값을 움직이기 (스크롤 방향에 따라)
          gsap.to('.star__shape-1', {
            y: moveDistance * 30,
            ease: 'power1.out',
            overwrite: true,
            duration: 0.1,
          });
          gsap.to('.star__shape-2', {
            y: moveDistance * 50,
            ease: 'power1.out',
            overwrite: true,
            duration: 0.1,
          });
          gsap.to('.star__shape-3', {
            y: moveDistance * 70,
            ease: 'power1.out',
            overwrite: true,
            duration: 0.1,
          });
          gsap.to('.star__shape-4', {
            y: moveDistance * 90,
            ease: 'power1.out',
            overwrite: true,
            duration: 0.1,
          });

          // 다음 프레임을 위해 값 업데이트
          lastScrollTop = currentScrollTop;
          lastTime = currentTime;

          // 스크롤 멈춤 감지: 일정 시간이 지나면 모든 star__shape를 y: 0으로
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            gsap.to(
              '.star__shape-1, .star__shape-2, .star__shape-3, .star__shape-4',
              {
                y: 0,
                ease: 'power1.out',
                duration: 0.5, // 부드럽게 원래 위치로 돌아가도록 설정
              }
            );
          }, 150); // 150ms 동안 스크롤이 없으면 y값을 0으로
        },
      },
    });

    // let lastScrollTop2 = 0;
    // let lastTime = Date.now();

    // const starShape = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: '.star',
    //     start: 'top top',
    //     end: 'bottom bottom',
    //     markers: false,
    //     scrub: 2,
    //     onUpdate: (self) => {
    //        const currentScrollTop = self.scroll(); // 현재 스크롤 위치
    //     const currentTime = Date.now(); // 현재 시간

    //     const deltaScroll = currentScrollTop - lastScrollTop2; // 스크롤 위치 변화량
    //     const deltaTime = currentTime - lastTime; // 시간 변화량

    //     const scrollSpeed = deltaScroll / deltaTime; // 스크롤 속도 계산

    //     console.log('스크롤 속도: ', scrollSpeed);

    //       move = gsap.timeline({})
    //       move.to('.star__shape',{
    //         y:???
    //       })
    //       move.to('.star__shape',{
    //         y:0
    //       })

    //     // 다음 프레임을 위해 값 업데이트
    //     lastScrollTop2 = currentScrollTop;
    //     lastTime = currentTime;

    //     },
    //   },
    // });

    // if (currentProgress > lastProgress) {
    //   // console.log(`스크롤 위로`);
    //   gsap.to('.star__shape-1', {
    //     y: currentProgress + 40, // 잠깐 위로 이동
    //     duration: currentProgress, // 이동 시간
    //     ease: 'power1.inOut',
    //     onComplete: () => {
    //       gsap.to('.star__shape-1', {
    //         y: 0, // 원래 위치로 돌아감
    //         duration: 0.1,
    //         ease: 'power1.inOut',
    //       });
    //     },
    //   });
    //   gsap.to('.star__shape-2', {
    //     y: currentProgress + 80, // 잠깐 위로 이동
    //     duration: currentProgress, // 이동 시간
    //     ease: 'power1.inOut',
    //     onComplete: () => {
    //       gsap.to('.star__shape-2', {
    //         y: 0, // 원래 위치로 돌아감
    //         duration: 0.1,
    //         ease: 'power1.inOut',
    //       });
    //     },
    //   });
    //   gsap.to('.star__shape-3', {
    //     y: currentProgress + 120, // 잠깐 위로 이동
    //     duration: currentProgress, // 이동 시간
    //     ease: 'power1.inOut',
    //     onComplete: () => {
    //       gsap.to('.star__shape-4', {
    //         y: 0, // 원래 위치로 돌아감
    //         duration: 0.1,
    //         ease: 'power1.inOut',
    //       });
    //     },
    //   });
    //   gsap.to('.star__shape-4', {
    //     y: currentProgress + 160, // 잠깐 위로 이동
    //     duration: currentProgress, // 이동 시간
    //     ease: 'power1.inOut',
    //     onComplete: () => {
    //       gsap.to('.star__shape-3', {
    //         y: 0, // 원래 위치로 돌아감
    //         duration: 0.1,
    //         ease: 'power1.inOut',
    //       });
    //     },
    //   });
    // } else if (currentProgress < lastProgress) {
    //   // console.log(`스크롤 위로`);
    //   gsap.to('.star__shape-1', {
    //     y: currentProgress + -40, // 잠깐 위로 이동
    //     duration: currentProgress, // 이동 시간
    //     ease: 'power1.inOut',
    //     onComplete: () => {
    //       gsap.to('.star__shape-1', {
    //         y: 0, // 원래 위치로 돌아감
    //         duration: 0.1,
    //         ease: 'power1.inOut',
    //       });
    //     },
    //   });
    //   gsap.to('.star__shape-2', {
    //     y: currentProgress + -80, // 잠깐 위로 이동
    //     duration: currentProgress, // 이동 시간
    //     ease: 'power1.inOut',
    //     onComplete: () => {
    //       gsap.to('.star__shape-2', {
    //         y: 0, // 원래 위치로 돌아감
    //         duration: 0.1,
    //         ease: 'power1.inOut',
    //       });
    //     },
    //   });
    //   gsap.to('.star__shape-3', {
    //     y: currentProgress + -120, // 잠깐 위로 이동
    //     duration: currentProgress, // 이동 시간
    //     ease: 'power1.inOut',
    //     onComplete: () => {
    //       gsap.to('.star__shape-4', {
    //         y: 0, // 원래 위치로 돌아감
    //         duration: 0.1,
    //         ease: 'power1.inOut',
    //       });
    //     },
    //   });
    //   gsap.to('.star__shape-4', {
    //     y: currentProgress + -160, // 잠깐 위로 이동
    //     duration: currentProgress, // 이동 시간
    //     ease: 'power1.inOut',
    //     onComplete: () => {
    //       gsap.to('.star__shape-3', {
    //         y: 0, // 원래 위치로 돌아감
    //         duration: 0.1,
    //         ease: 'power1.inOut',
    //       });
    //     },
    //   });
    // }

    // 상태 업
    // lastProgress = currentProgress;
    const starVideo = document.getElementById('starVideo');

    const star = gsap.timeline({
      scrollTrigger: {
        trigger: '.star__wrap',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        markers: false, // 디버그용 마커
        onEnter: () => {
          starVideo.play();
        },
        onLeaveBack: () => {
          starVideo.pause();
        },
      },
    });

    star.to('.star__video', {
      '--scaling-value': 5,
      duration: 1,
      ease: 'none',
    });

    //trailer
    // Split text into words and characters
    ScrollTrigger.create({
      trigger: '.trailer',
      start: 'top 50%',
      scrub: 1,
      onEnter: () => {
        gsap.to('.trailer .headline .word',{
          opacity:1,
          filter:'blur(0)',
          stagger:{
            amount:.4
        }})
      },
    });
    let mm = gsap.matchMedia();
    mm.add('(max-width: 999px)', () => {
      ScrollTrigger.create({
        trigger: '.trailer',
        start: 'top bottom',
        end: 'bottom bottom',
        markers: false,
        onEnter: () => {
          $('.trailer__video-mobile video')[0].play();
        },
        onLeaveBack: () => {
          $('.trailer__video-mobile video')[0].pause();
        },
      });
    });
    mm.add('(min-width: 1000px)', () => {
      const trailerContent = gsap.timeline({
        scrollTrigger: {
          trigger: '.trailer',
          start: '0 50%',
          end: '+=100%',
          markers: false,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      trailerContent.to(
        '.trailer__video .content',
        10,
        {
          '--clip-w': 0,
          '--clip-ridus': 0,
        },
      );

      const trailerCover = gsap.timeline({
        scrollTrigger: {
          trigger: '.trailer__video .sticky__wrap',
          start: 'top 0',
          end: '+=100%',
          // markers: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      trailerCover.to('.trailer .new', {
        height: 0,
      });
      const video = document.getElementById('bgVideo');
      const texts = document.querySelectorAll('.trailer__video p');
      const trailerVideo = gsap.timeline({
        scrollTrigger: {
          trigger: '.trailer__video .sticky__wrap',
          start: 'top -100%',
          end: 'bottom bottom',
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const scrollPercent = self.progress;
            const videoDuration = video.duration;
            const currentTime = scrollPercent * videoDuration;
            a = currentTime.toFixed(1);
            video.currentTime = currentTime;
            // console.log(currentTime);

            updateCurrent(currentTime);
          },
        },
      });

      function updateCurrent(currentTime) {
        $('[data-scroll-video-time]').each(function () {
          const timeRange = $(this).data('scroll-video-time').split(',').map(Number);
          const [startTime, endTime] = timeRange;
          const word = $(this).find('.word');
          if (currentTime >= startTime && currentTime <= endTime) {
            gsap.to(word, {
              opacity: 1,
              filter: 'blur(0)',
              stagger:0.01
            });
          } else {
            gsap.to(word,{
              opacity:0,
              filter:'blur(0.6rem)'
            })
          }
        });
      }
    });

    //swiper
    const journalSwiper = new Swiper('.journal__swiper', {
      slidesPerView: 1.33,
      spaceBetween: 20,
      grabCursor: true, // 드래그 커서
      breakpoints: {
        700: {
          slidesPerView: 2.33,
        },
        1000: {
          slidesPerView: 3.33,
        },
      },
      pagination: {
        el: '.journal .swiper-pagination',
        type: 'progressbar',
      },
    });

    //footer
    const footer = gsap.timeline({
      scrollTrigger: {
        trigger: '.footer',
        start: 'top 50%',
        endTrigger: '.footer__info',
        end: 'bottom bottom',
        scrub: 0, // 스크롤에 따라 애니메이션 동기화
        markers: false,
        onUpdate: function (self) {
          gsap.to('.footer__logo', { '--smooth-progress': self.progress });
        },
      },
    });

    footer.fromTo('.footer__logo', { yPercent: 120 }, { yPercent: 0 });
  }); //loading
}; //onload


const videoTxt = new SplitType('p[data-scroll-video-time]', {
  types: 'words, chars',
});
const trailerTxt = new SplitType('.trailer .headline', {
  types: 'words, chars',
});
const headTxt = new SplitType('.intro .headline', {
  types: 'words, chars',
});