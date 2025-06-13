import {
  IonContent,
  IonPage,
} from "@ionic/react";
import "./PublicHome.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const PublicHome: React.FC = () => {
  const data = [
    {
      id: 1,
      title: "Abandone as planilhas",
      description: "Controle suas finanças de forma simples e eficiente.",
    },
    {
      id: 2,
      title: "Organização e praticidade",
      description: "Mantenha suas despesas e investimentos organizadas em um só lugar.",
    },
    {
      id: 3,
      title: "Relatórios detalhados",
      description: "Visualize seus gastos com relatórios claros e objetivos.",
    },
    {
      id: 4,
      title: "Controle total dos seus investimentos",
      description: "Acompanhe o desempenho dos seus investimentos em tempo real.",
    },
  ]

  return (
    <IonPage>
      <IonContent fullscreen>
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          id="container"
        >
          {data.map((item) => (
            <SwiperSlide key={item.id}>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </SwiperSlide>
          ))}
          ...
        </Swiper>
      </IonContent>
    </IonPage>
  );
};

export default PublicHome;
