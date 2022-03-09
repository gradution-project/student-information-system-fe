import SISTitle from "../public/components/page-titles";
import SisOfficerStorage from "../public/storage/officer/SisOfficerStorage";
import {getTeacherNumberWithContext} from "../public/storage/teacher";
import {getStudentNumberWithContext} from "../public/storage/student";

export async function getServerSideProps(context) {
    const studentId = getStudentNumberWithContext(context)
    let isStudentLoginSuccess = true;
    if (studentId === undefined) {
        isStudentLoginSuccess = false;
    }

    const teacherId = getTeacherNumberWithContext(context)
    let isTeacherLoginSuccess = true;
    if (teacherId === undefined) {
        isTeacherLoginSuccess = false;
    }

    const officerId = SisOfficerStorage.getNumberWithContext(context);
    let isOfficerLoginSuccess = true;
    if (officerId === undefined) {
        isOfficerLoginSuccess = false;
    }

    return {
        props: {
            isStudentLoginSuccess: isStudentLoginSuccess,
            isTeacherLoginSuccess: isTeacherLoginSuccess,
            isOfficerLoginSuccess: isOfficerLoginSuccess,
        }
    }
}

export default function Main({isStudentLoginSuccess, isTeacherLoginSuccess, isOfficerLoginSuccess}) {
    return (
        <div className="bg-sis-gray h-screen font-phenomenaBold">
            <div
                className=" max-w-7xl m-auto py-12 px-4 text-center sm:text-left sm:px-64 sm:py-72 lg:py-72 lg:px-12 lg:flex lg:items-center lg:justify-between">
                <SISTitle/>
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    <img src="banner.png" className="h-40"/>
                </h2>

                <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                    <div className="inline-flex rounded-md shadow">
                        <a
                            href={isStudentLoginSuccess ? "/student" : "/login/student"}
                            className="text-2xl h-16 inline-flex items-center justify-center px-5 py-3 border border-transparent font-medium rounded-md text-white bg-sis-yellow hover:bg-sis-yellow"
                        >
                            Öğrenci Girişi
                        </a>
                    </div>
                    <div className="ml-3 inline-flex rounded-md shadow">
                        <a
                            href={isTeacherLoginSuccess ? "/teacher" : "/login/teacher"}
                            className="text-2xl h-16 inline-flex items-center justify-center px-5 py-3 border border-transparent font-medium rounded-md text-white bg-sis-darkblue hover:bg-sis-darkblue"
                        >
                            Öğretmen Girişi
                        </a>
                    </div>
                    <div className="ml-3 inline-flex rounded-md shadow">
                        <a
                            href={isOfficerLoginSuccess ? "/officer" : "/login/officer"}
                            className="text-2xl h-16 inline-flex items-center justify-center px-5 py-3 border border-transparent font-medium rounded-md text-white bg-sis-blue hover:bg-sis-blue"
                        >
                            Personel Girişi
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
