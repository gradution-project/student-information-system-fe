import SISTitle from "../../public/components/page-titles";
import OfficerNavbar from "../../public/components/navbar/officer/officer-navbar";
import Cookies from "universal-cookie";

export default function OfficerDashboard() {

    const cookies = new Cookies();

    return (
        <div>
            <SISTitle/>
            <OfficerNavbar/>
            <div className="py-10 bg-sis-yellow rounded-3xl shadow-xl ml-80 mr-80 mt-56">
                <div className="mb-2 select-none font-phenomenaRegular text-6xl text-center text-sis-white">
                    <div>
                        Merhaba <a className="font-phenomenaBold">{cookies.get("officerFullName")}</a>,
                    </div>
                    <div>
                        Öğrenci Bilgi Sistemine Hoşgeldiniz!
                    </div>
                </div>
            </div>
        </div>
    )
}