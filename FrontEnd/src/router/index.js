import { createRouter, createWebHistory }from "vue-router";
import UploadComponent from "../components/UploadComponent";
import SlidesComponent from "../components/SlidesComponent";
import FolderComponent from "../components/FolderComponent";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "home",
            component: UploadComponent
        },
        {
            path: "/img/:id",
            name: "slides",
            component: SlidesComponent

        },
        {
            path:"/folders",
            component: FolderComponent
        }
    ]
})

export default router