import request from "@/axios/index";
import configfun from '@/config/congig'
/* dataJson */
export async function dataJson(meetid) {
    let baseUrl =(await configfun()).baseurl;
    return request({
        url:`${baseUrl}/api/get-wn-meeting-data?meeting_id=${meetid}`,
    })
}
