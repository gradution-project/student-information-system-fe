import TeacherNavbar from "../../public/components/navbar/teacher/teacher-navbar";
import SISTitle from "../../public/components/page-titles";
import Cookies from "universal-cookie";

export default function TeacherDashboard() {

    const cookies = new Cookies();

    return (
        <div>
            <SISTitle/>
            <TeacherNavbar/>
            <div className="py-10 bg-sis-yellow rounded-3xl shadow-xl ml-80 mr-80 mt-56">
                <div className="mb-2 select-none font-phenomenaRegular text-6xl text-center text-sis-white">
                    <div>
                        Merhaba <a className="font-phenomenaBold">{cookies.get("teacherFullName")}</a>,
                    </div>
                    <div>
                        Öğrenci Bilgi Sistemine Hoşgeldiniz!
                    </div>
                </div>
            </div>
        </div>
    )
}
