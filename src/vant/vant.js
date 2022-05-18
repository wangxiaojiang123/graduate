import Vue from "vue";
import {
  Tab,
  Tabs,
  Empty,
  Toast,
  Button,
  Icon,
  Swipe,
  SwipeItem,
  Dialog,
  AddressEdit,
  Collapse,
  CollapseItem,
  Search,
  Uploader,
  Picker,
  Calendar,
  Cell,
  Badge,
  Field,
  CellGroup,
} from "vant";

const components = [
  Tab,
  Tabs,
  Empty,
  Toast,
  Button,
  Icon,
  Swipe,
  SwipeItem,
  Dialog,
  AddressEdit,
  Collapse,
  CollapseItem,
  Search,
  Uploader,
  Picker,
  Calendar,
  Cell,
  Badge,
  Field,
  CellGroup,
];

components.forEach((el) => {
  Vue.use(el);
});
