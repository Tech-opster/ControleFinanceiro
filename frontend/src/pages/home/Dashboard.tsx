import { IonContent, IonPage } from "@ionic/react";
import { useIncomes } from "../../hooks/useIncomes";
import { useOutflows } from "../../hooks/useOutflows";
import { useCategories } from "../../hooks/useCategories";
import { useMemo } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  type PieLabelRenderProps,
} from "recharts";
import "./Dashboard.css";

type TooltipProps = {
  active?: boolean;
  payload?: Array<{
    name?: string;
    value?: number | string;
  }>;
};

const COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#FFA07A",
  "#98D8C8",
  "#F7DC6F",
  "#BB8FCE",
  "#85C1E2",
  "#F8B88B",
  "#A9DFBF",
];

const Dashboard: React.FC = () => {
  const { data: incomeData } = useIncomes();
  const { data: outflowData } = useOutflows();
  const { dataCategories } = useCategories();

  const monthlyData = useMemo(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const monthNames = [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ];
    const months: Record<string, { incomes: number; outflows: number }> = {};

    for (let i = 0; i <= currentMonth; i++) {
      const monthKey = `${monthNames[i]}`;
      months[monthKey] = { incomes: 0, outflows: 0 };
    }

    incomeData.forEach((item) => {
      const date = new Date(item.date);
      if (
        date.getFullYear() === currentYear &&
        date.getMonth() <= currentMonth
      ) {
        const monthKey = monthNames[date.getMonth()];
        months[monthKey].incomes += Number(item.amount);
      }
    });

    outflowData.forEach((item) => {
      const date = new Date(item.date);
      if (
        date.getFullYear() === currentYear &&
        date.getMonth() <= currentMonth
      ) {
        const monthKey = monthNames[date.getMonth()];
        months[monthKey].outflows += Number(item.amount);
      }
    });

    return Object.entries(months).map(([month, data]) => ({
      month,
      Receitas: data.incomes,
      Despesas: data.outflows,
    }));
  }, [incomeData, outflowData]);

  const donutData = useMemo(() => {
    return dataCategories.map((cat) => ({
      name: cat.category,
      value: parseFloat(cat.totalAmount),
    }));
  }, [dataCategories]);

  const totalExpenses = useMemo(() => {
    return donutData.reduce((sum, item) => sum + item.value, 0);
  }, [donutData]);

  const CustomTooltip = ({ active, payload }: TooltipProps) => {
    if (active && payload && payload.length) {
      const receita = payload[0];
      const despesa = payload[1];
      const receitaValue = Number(receita.value ?? 0);
      const despesaValue = Number(despesa.value ?? 0);
      const saldo = receitaValue - despesaValue;
      return (
        <div className="custom-tooltip">
          <p>{receita.name}</p>
          <p>
            R${" "}
            {receitaValue.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
          <p>{despesa.name}</p>
          <p>
            R${" "}
            {despesaValue.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
          <p>Saldo</p>
          <p>
            R${" "}
            {saldo.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomDonutTooltip = ({ active, payload }: TooltipProps) => {
    if (active && payload && payload.length) {
      const item = payload[0];
      const value = Number(item.value ?? 0);

      const percentage = ((value / totalExpenses) * 100).toFixed(1);
      return (
        <div className="custom-tooltip">
          <p>{item.name}</p>
          <p>
            R${" "}
            {value.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
          <p>{percentage}%</p>
        </div>
      );
    }
    return null;
  };

  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: PieLabelRenderProps) => {
    const cxValue = Number(cx ?? 0);
    const cyValue = Number(cy ?? 0);
    const midAngleValue = Number(midAngle ?? 0);
    const innerRadiusValue = Number(innerRadius ?? 0);
    const outerRadiusValue = Number(outerRadius ?? 0);
    const percentValue = Number(percent ?? 0);

    if (
      !Number.isFinite(cxValue) ||
      !Number.isFinite(cyValue) ||
      !Number.isFinite(midAngleValue) ||
      !Number.isFinite(innerRadiusValue) ||
      !Number.isFinite(outerRadiusValue) ||
      !Number.isFinite(percentValue)
    ) {
      return null;
    }

    if (percentValue < 0.05) return null;

    const RADIAN = Math.PI / 180;
    const radius =
      innerRadiusValue + (outerRadiusValue - innerRadiusValue) * 0.5;
    const x = cxValue + radius * Math.cos(-midAngleValue * RADIAN);
    const y = cyValue + radius * Math.sin(-midAngleValue * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cxValue ? "start" : "end"}
        dominantBaseline="central"
        className="donut-label"
        fontWeight="bold"
      >
        {`${(percentValue * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <IonPage>
      <IonContent className="ion-padding dashboard-container">
        <div className="charts-wrapper">
          <div className="chart-section">
            <h2>Receitas e Despesas por Mês</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={monthlyData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 0,
                  bottom: 50,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="Receitas" fill="#82ca9d" radius={[8, 8, 0, 0]} />
                <Bar dataKey="Despesas" fill="#ff7c7c" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-section">
            <h2>Despesas por Categoria</h2>
            <div className="donut-wrapper">
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={donutData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomLabel}
                    innerRadius={80}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {donutData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomDonutTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="donut-legend">
                {donutData.map((item, index) => (
                  <div key={item.name} className="legend-item">
                    <span
                      className="legend-color"
                      style={{
                        backgroundColor: COLORS[index % COLORS.length],
                      }}
                    />
                    <span className="legend-text">{item.name}</span>
                    <span className="legend-value">
                      R${" "}
                      {item.value.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
