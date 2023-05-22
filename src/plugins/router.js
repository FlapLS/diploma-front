import {createRouter, createWebHistory} from "vue-router";



import CreatePrinter from "@/components/AdminPage/Body/PrintersCards/CreatePrinter.vue";
import EditPrinter from "@/components/AdminPage/Body/PrintersCards/EditPrinter.vue";
import CardProduct from "@/components/AdminPage/Body/PrintersCards/CardProduct.vue";
import CardProductShop from "@/components/PrinterShopPage/Body/CardProductPrinterShop.vue";
import CreatePlaticModel from "@/components/AdminPage/Body/PlatsticModelsCards/CreatePlaticModel.vue";
import EditPlaticModel from "@/components/AdminPage/Body/PlatsticModelsCards/EditPlaticModel.vue";
import CardPlaticModel from "@/components/AdminPage/Body/PlatsticModelsCards/CardPlaticModel.vue";
import UpdateShop from "@/components/AdminPage/Body/PlatsticModelsCards/UpdateShop.vue";
import MainPagePrinterShop from "@/views/MainPagePrinterShop.vue";
import MainPagePlasticModelShop from "@/views/MainPagePlasticModelShop.vue";
import MainPageAdminPanel from "@/views/MainPageAdminPanel.vue";
import CardProdcutPlasticModelShop from "@/components/PlaticModelShopPage/Body/CardProdcutPlasticModelShop.vue";
import UpdateShopPrinter from "@/components/AdminPage/Body/PrintersCards/UpdateShopPrinter.vue";
import PrinerShopChart from "@/components/AdminPage/Body/PrintersCards/PrinerShopChart.vue";





export default createRouter(
    {
        history: createWebHistory(),
        routes: [
            {path: "/", component: MainPagePrinterShop},
            {path:"/:id/card",component:CardProductShop},
            {path: "/plastic-models", component: MainPagePlasticModelShop},
            {path: "/plastic-models/:id/card", component: CardProdcutPlasticModelShop},
            {path: '/admin', component: MainPageAdminPanel},
            {path: '/admin/printers/create', component: CreatePrinter},
            {path: '/admin/plastic-models/create', component: CreatePlaticModel},
            {path: '/admin/printers/:id/edit', component: EditPrinter},
            {path: '/admin/plastic-models/:id/edit', component: EditPlaticModel},
            {path: '/admin/printers/:id/card', component: CardProduct},
            {path: '/admin/printers/:id/card/:id_shop/chart', component: PrinerShopChart},
            {path: '/admin/plastic-models/:id/card', component: CardPlaticModel},
            {path: '/admin/plastic-models/:id/card/:id_shop/shop', component: UpdateShop},
            {path: '/admin/printers/:id/card/:id_shop/shop', component: UpdateShopPrinter},
        ]
    }
)