import { IonButton, IonContent, IonPage, useIonRouter } from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useIsMobile } from "../../hooks/useIsMobile";
import spreadsheetapp from "../../assets/images/spreadsheetapp.png";
import planning from "../../assets/images/planning.png";
import analytics from "../../assets/images/analytics.png";
import growth from "../../assets/images/growth.png";
import LoginForm from "../../components/authentication/LoginForm";

const Onboarding: React.FC = () => {
  const router = useIonRouter();
  const isMobile = useIsMobile();

  const swiperData = [
    {
      id: 1,
      title: "Abandone as planilhas",
      description: "Controle suas finanças de forma simples e eficiente.",
      image: spreadsheetapp,
    },
    {
      id: 2,
      title: "Organização e praticidade",
      description:
        "Mantenha suas despesas e investimentos organizadas em um só lugar.",
      image: planning,
    },
    {
      id: 3,
      title: "Relatórios detalhados",
      description: "Visualize seus gastos com relatórios claros e objetivos.",
      image: analytics,
    },
    {
      id: 4,
      title: "Controle total dos seus investimentos",
      description:
        "Acompanhe o desempenho dos seus investimentos em tempo real.",
      image: growth,
    },
  ];

  return (
    <IonPage>
      <IonContent>
        <div className="h-full min-h-fit flex justify-center items-center ion-padding">
          <div className="w-full flex-2 ion-text-center">
            <Swiper
              className="!max-w-[600px] !pb-[32px] !mb-[20px]"
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={50}
              slidesPerView={1}
              navigation={{ enabled: false }}
              pagination
              loop={true}
              breakpoints={{
                480: {
                  navigation: {
                    enabled: true,
                  },
                },
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
            >
              {swiperData.map((item) => (
                <SwiperSlide className="!flex !flex-col !justify-center !items-center" key={item.id}>
                  <img className="max-h-[340px]" src={item.image} alt={item.title} />
                  <h2>{item.title}</h2>
                  <p className="text-[16px] leading-[22px] text-[#8c8c8c] m-0">{item.description}</p>
                </SwiperSlide>
              ))}
            </Swiper>

            {isMobile && (
              <IonButton
                onClick={() => {
                  router.push("/login", "forward", "push");
                }}
              >
                Começar agora
              </IonButton>
            )}
          </div>
          
          {!isMobile && (
            <div className="flex flex-1">
              <LoginForm></LoginForm>
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Onboarding;
