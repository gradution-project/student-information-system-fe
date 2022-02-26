import StudentNavbar from "../../public/components/navbar/student/student-navbar";
import SISTitle from "../../public/components/page-titles";
import Cookies from "universal-cookie";
import UnauthorizedAccessPage from "../401";

export async function getServerSideProps(context) {
    const studentId = context.req.cookies['studentNumber']
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

    if (isPagePermissionSuccess) {

        const cookies = new Cookies();

        return (
            <div>
                <SISTitle/>
                <StudentNavbar/>
                <div className="py-10 bg-sis-yellow rounded-3xl shadow-xl ml-80 mr-80 mt-56">
                    <div className="mb-2 select-none font-phenomenaRegular text-6xl text-center text-sis-white">
                        <div>
                            Merhaba <a className="font-phenomenaBold">{cookies.get("studentFullName")}</a>,
                        </div>
                        <div>
                            Öğrenci Bilgi Sistemine Hoşgeldiniz!
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <UnauthorizedAccessPage user=""/>
        )
    }
}
