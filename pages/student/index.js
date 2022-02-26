import StudentNavbar from "../../public/components/navbar/student/student-navbar";
import SISTitle from "../../public/components/page-titles";
import UnauthorizedAccessPage from "../401";
import {getStudentFullName, getStudentNumberWithContext} from "../../public/storage/student";

export async function getServerSideProps(context) {
    const studentId = getStudentNumberWithContext(context)
    if (studentId === undefined) {
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

export default function StudentDashboard({isPagePermissionSuccess}) {

    if (!isPagePermissionSuccess) {
        return (
            <UnauthorizedAccessPage user=""/>
        )
    }

    return (
        <div>
            <SISTitle/>
            <StudentNavbar/>
            <div className="py-10 bg-sis-yellow rounded-3xl shadow-xl ml-80 mr-80 mt-56">
                <div className="mb-2 select-none font-phenomenaRegular text-6xl text-center text-sis-white">
                    <div>
                        Merhaba <a className="font-phenomenaBold">{getStudentFullName()}</a>,
                    </div>
                    <div>
                        Öğrenci Bilgi Sistemine Hoşgeldiniz!
                    </div>
                </div>
            </div>
        </div>
    )
}
