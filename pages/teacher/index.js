import TeacherNavbar from "../../public/components/navbar/teacher/teacher-navbar";
import SISTitle from "../../public/components/page-titles";

export default function TeacherDashboard() {
    return (
        <div>
            <SISTitle/>
            <TeacherNavbar/>
            <div className="font-phenomenaExtraBold text-sis-darkblue text-6xl text-center mt-60">
                Öğrenci Bilgi Sistemine Hoşgeldiniz!
            </div>
        </div>
    )
}
