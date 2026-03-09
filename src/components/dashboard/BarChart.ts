import { computed, defineComponent, h, PropType } from "vue";

import { Bar } from "vue-chartjs";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  Plugin,
} from "chart.js";
import { GroupedByPeriods } from "@/api";
import { useI18n } from "@/plugins";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

interface Datasets {
  label: string;
  backgroundColor: string;
  data: number[];
}

export default defineComponent({
  name: "BarChart",
  components: {
    Bar,
  },
  props: {
    chartId: {
      type: String,
      default: "bar-chart",
    },
    width: {
      type: Number,
      default: 1200,
    },
    height: {
      type: Number,
      default: 350,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object as PropType<Partial<CSSStyleDeclaration>>,
      default: () => ({}),
    },
    plugins: {
      type: Array as PropType<Plugin<"bar">[]>,
      default: () => [],
    },
    charts: {
      type: Object as PropType<{
        expensesPeriod: GroupedByPeriods[] | undefined;
        incomePeriod: GroupedByPeriods[] | undefined;
        labels: string[];
      }>,
      required: true,
    },
  },
  setup(props) {
    const i18n = useI18n();

    const chartData = computed(() => {
      // TODO для универсальности это потом вынести из этого компонента и chartData сделать обычным computed методом
      const expenses = {} as Datasets;
      const income = {} as Datasets;

      for (const key in props.charts) {
        if (key === "expensesPeriod" && props.charts[key]) {
          expenses.backgroundColor = "#eb7777";
          expenses.label = i18n.t("fields.expenses");
          expenses.data = props.charts[key]?.map((val) => val.sum) || [];
        } else if (key === "incomePeriod" && props.charts[key]) {
          income.backgroundColor = "#18a460";
          income.label = i18n.t("fields.incomes");
          income.data = props.charts[key]?.map((val) => val.sum) || [];
        }
      }

      return {
        labels: props.charts.labels,
        datasets: [
          {
            ...income,
          },
          {
            ...expenses,
          },
        ],
      };
    });

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
    };

    return () =>
      h(Bar, {
        chartData: chartData.value,
        chartOptions,
        chartId: props.chartId,
        width: props.width,
        height: props.height,
        cssClasses: props.cssClasses,
        styles: props.styles,
        plugins: props.plugins,
      });
  },
});
