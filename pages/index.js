import SISTitle from "../public/components/page-titles";
import SisOfficerStorage from "../public/storage/officer/SisOfficerStorage";
import SisTeacherStorage from "../public/storage/teacher/SisTeacherStorage";
import SisStudentStorage from "../public/storage/student/SisStudentStorage";

export async function getServerSideProps(context) {
    const studentId = SisStudentStorage.getNumberWithContext(context);
    let isStudentLoginSuccess = true;
    if (studentId === undefined) {
        isStudentLoginSuccess = false;
    }

    const teacherId = SisTeacherStorage.getNumberWithContext(context);
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
                className="select-none max-w-7xl m-auto py-12 px-4 text-center sm:text-left sm:px-64 sm:py-72 lg:py-72 lg:px-12 lg:flex lg:items-center lg:justify-between">
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
                            ????renci Giri??i
                        </a>
                    </div>
                    <div className="ml-3 inline-flex rounded-md shadow">
                        <a
                            href={isTeacherLoginSuccess ? "/teacher" : "/login/teacher"}
                            className="text-2xl h-16 inline-flex items-center justify-center px-5 py-3 border border-transparent font-medium rounded-md text-white bg-sis-darkblue hover:bg-sis-darkblue"
                        >
                            ????retmen Giri??i
                        </a>
                    </div>
                    <div className="ml-3 inline-flex rounded-md shadow">
                        <a
                            href={isOfficerLoginSuccess ? "/officer" : "/login/officer"}
                            className="text-2xl h-16 inline-flex items-center justify-center px-5 py-3 border border-transparent font-medium rounded-md text-white bg-sis-blue hover:bg-sis-blue"
                        >
                            Personel Giri??i
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
