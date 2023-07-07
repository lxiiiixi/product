import Request from "../request";

export function getObjList() {
    return Request({
        method: "GET",
        url: "/api/obj/list/all",
    });
}
