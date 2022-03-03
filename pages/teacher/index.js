import TeacherNavbar from "../../public/components/navbar/teacher/teacher-navbar";
import SISTitle from "../../public/components/page-titles";
import UnauthorizedAccessPage from "../401";
import {getTeacherFullName, getTeacherNumberWithContext} from "../../public/storage/teacher";

export async function getServerSideProps(context) {
    const teacherId = getTeacherNumberWithContext(context);
    if (teacherId === undefined) {
        return {
            props: {
                isPagePermissionSuccess: false
            }
        }
    }

    return {
        props: {
            isPagePermissionSuccess: true
        }
    }
}

export default function TeacherDashboard({isPagePermissionSuccess}) {

    if (!isPagePermissionSuccess) {
        return (
            <UnauthorizedAccessPage user=""/>
        )
    }

    return (
        <div>
            <SISTitle/>
            <TeacherNavbar/>
            <div className="py-10 bg-sis-yellow rounded-3xl shadow-xl ml-80 mr-80 mt-56">
                <div className="mb-2 select-none font-phenomenaRegular text-6xl text-center text-sis-white">
                    <div>
                        Merhaba <a className="font-phenomenaBold">{getTeacherFullName()}</a>,
                    </div>
                    <div>
                        Öğrenci Bilgi Sistemine Hoşgeldiniz!
                    </div>
                </div>
            </div>
        </div>
    )
}
