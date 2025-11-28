import { IonContent, IonPage } from "@ionic/react";
import { useIncomes } from "../../hooks/useIncomes";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer, 
} from "recharts";

const Dashboard: React.FC = () => {
  const { data } = useIncomes();

  const filterDate = data.reduce<Record<string, number>>((acc, item) => {
    const monthKey = item.date.toLocaleString().slice(0, 7);

    if (acc[monthKey]) {
      acc[monthKey] += Number(item.amount);
    } else {
      acc[monthKey] = Number(item.amount);
    }

    return acc;
  }, {});

  const barChart = Object.entries(filterDate).map(([month, amount]) => ({
    month: month,
    amount: amount,
  }));

  return (
    <IonPage>
      <IonContent className="ion-padding">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={barChart}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="amount"
                fill="#82ca9d"
                activeBar={<Rectangle fill="gold" stroke="purple" />}
              />
            </BarChart>
          </ResponsiveContainer>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
