import SISTitle from "../../../../../../public/components/page-titles";
import {useRouter} from "next/router";
import UnauthorizedAccessPage from "../../../../../401";
import DepartmentController from "../../../../../../public/api/department/DepartmentController";
import DepartmentStatus from "../../../../../../public/constants/department/DepartmentStatus";
import PageNotFound from "../../../../../404";
import SisTeacherStorage from "../../../../../../public/storage/teacher/SisTeacherStorage";
import StudentGraduationStatus from "../../../../../../public/constants/student/graduated/StudentGraduationStatus";
import StudentClassLevel from "../../../../../../public/constants/student/StudentClassLevel";
import StudentDegree from "../../../../../../public/constants/student/StudentDegree";
import TeacherNavbar from "../../../../../../public/components/navbar/teacher/teacher-navbar";
import {useState} from "react";
import TeacherRole from "../../../../../../public/constants/teacher/TeacherRole";
import SuccessNotification from "../../../../../../public/notifications/success";
import FailNotification from "../../../../../../public/notifications/fail";
import ProcessNotification from "../../../../../../public/notifications/process";
import StudentGraduationController from "../../../../../../public/api/student/graduation/StudentGraduationController";

export async function getServerSideProps(context) {
    const teacherId = SisTeacherStorage.getNumberWithContext(context);
    if (teacherId === undefined) {
        return {
            props: {
                isPagePermissionSuccess: false
            }
        }
    }

    const departmentsData = await DepartmentController.getAllDepartmentsByStatus(DepartmentStatus.ACTIVE);

    const {graduationId} = context.query;
    const studentData = await StudentGraduationController.getStudentGraduationDetailByGraduationId(graduationId);
    if (studentData.success && departmentsData.success) {
        return {
            props: {
                isPagePermissionSuccess: true,
                isDataFound: true,
                operationUserId: teacherId,
                departments: departmentsData.response,
                studentGraduation: studentData.response
            }
        }
    } else {
        return {
            props: {
                isPagePermissionSuccess: true,
                isDataFound: false
            }
        }
    }
}


export default function StudentGraduationDetail({isPagePermissionSuccess, isDataFound, operationUserId, studentGraduation}) {

    if (!isPagePermissionSuccess) {
        return (
            <UnauthorizedAccessPage user="teacher"/>
        )
    }

    if (!isDataFound) {
        return (
            <PageNotFound user="/teacher"/>
        )
    }

    const teacherRole = SisTeacherStorage.getRole();

    const {studentInfoResponse} = studentGraduation;
    const {departmentResponse} = studentInfoResponse;
    const {facultyResponse} = departmentResponse;

    const router = useRouter();


     /**
          * STUDENT APPROVED GRADUATE OPERATION
         */

        let [isOpenProcessingApprovedGraduateNotification, setIsOpenProcessingApprovedGraduateNotification] = useState(false);

         function closeProcessingApprovedGraduateNotification() {
            setIsOpenProcessingApprovedGraduateNotification(false);
         }

       function openProcessingApprovedGraduateNotification() {
             setIsOpenProcessingApprovedGraduateNotification(true);
        }

         let [isOpenSuccessApprovedGraduateNotification, setIsOpenSuccessApprovedGraduateNotification] = useState(false);

         function closeSuccessApprovedGraduateNotification() {
            setIsOpenSuccessApprovedGraduateNotification(false);
             router.push("/teacher/student/graduation/operations").then(() => router.reload());
        }

         function openSuccessApprovedGraduateNotification() {
            setIsOpenSuccessApprovedGraduateNotification(true);
         }

        let [isOpenFailApprovedGraduateNotification, setIsOpenFailApprovedGraduateNotification] = useState(false);

        function closeFailApprovedGraduateNotification() {
             setIsOpenFailApprovedGraduateNotification(false);
        }

         function openFailApprovedGraduateNotification() {
            setIsOpenFailApprovedGraduateNotification(true);
        }

         const studentApprovedGraduate = async (event) => {
            openProcessingApprovedGraduateNotification();

            event.preventDefault();

            const {graduationId} = studentGraduation;
             const studentData = await StudentGraduationController.approveStudentGraduation(operationUserId, graduationId);
             if (studentData.success) {
                 closeProcessingApprovedGraduateNotification();
                 openSuccessApprovedGraduateNotification();
            } else {
                 closeProcessingApprovedGraduateNotification();
                 openFailApprovedGraduateNotification();
             }
         }

    /**
     * STUDENT REJECT GRADUATE OPERATION
     */

    let [isOpenProcessingRejectedGraduateNotification, setIsOpenProcessingRejectedGraduateNotification] = useState(false);

    function closeProcessingRejectedGraduateNotification() {
        setIsOpenProcessingRejectedGraduateNotification(false);
    }

    function openProcessingRejectedGraduateNotification() {
        setIsOpenProcessingRejectedGraduateNotification(true);
    }

    let [isOpenSuccessRejectedGraduateNotification, setIsOpenSuccessRejectedGraduateNotification] = useState(false);

    function closeSuccessRejectedGraduateNotification() {
        setIsOpenSuccessRejectedGraduateNotification(false);
        router.push("/teacher/student/graduation/operations").then(() => router.reload());
    }

    function openSuccessRejectedGraduateNotification() {
        setIsOpenSuccessRejectedGraduateNotification(true);
    }

    let [isOpenFailRejectedGraduateNotification, setIsOpenFailRejectedGraduateNotification] = useState(false);

    function closeFailRejectedGraduateNotification() {
        setIsOpenFailRejectedGraduateNotification(false);
    }

    function openFailRejectedGraduateNotification() {
        setIsOpenFailRejectedGraduateNotification(true);
    }

    const studentRejectGraduate = async (event) => {
        openProcessingRejectedGraduateNotification();

        event.preventDefault();

        const {graduationId} = studentGraduation;
        const studentData = await StudentGraduationController.rejectStudentGraduation(operationUserId, graduationId);
        if (studentData.success) {
            closeProcessingRejectedGraduateNotification();
            openSuccessRejectedGraduateNotification();
        } else {
            closeProcessingRejectedGraduateNotification();
            openFailRejectedGraduateNotification();
        }
    }


          /**
          * STUDENT CONFIRM GRADUATE OPERATION
          */

         let [isOpenProcessingConfirmGraduateNotification, setIsOpenProcessingConfirmGraduateNotification] = useState(false);

         function closeProcessingConfirmGraduateNotification() {
             setIsOpenProcessingConfirmGraduateNotification(false);
         }

         function openProcessingConfirmGraduateNotification() {
             setIsOpenProcessingConfirmGraduateNotification(true);
         }

         let [isOpenSuccessConfirmGraduateNotification, setIsOpenSuccessConfirmGraduateNotification] = useState(false);

         function closeSuccessConfirmGraduateNotification() {
             setIsOpenSuccessConfirmGraduateNotification(false);
             router.push("/teacher/student/graduation/operations").then(() => router.reload());
         }

         function openSuccessConfirmGraduateNotification() {
             setIsOpenSuccessConfirmGraduateNotification(true);
         }

         let [isOpenFailConfirmGraduateNotification, setIsOpenFailConfirmGraduateNotification] = useState(false);

         function closeFailConfirmGraduateNotification() {
             setIsOpenFailConfirmGraduateNotification(false);
         }

         function openFailConfirmGraduateNotification() {
             setIsOpenFailConfirmGraduateNotification(true);
         }

         const studentConfirmGraduate = async (event) => {
             openProcessingConfirmGraduateNotification();

             event.preventDefault();

             const {graduationId} = studentGraduation;
             const studentData = await StudentGraduationController.confirmStudentGraduation(operationUserId, graduationId);
             if (studentData.success) {
                 closeProcessingConfirmGraduateNotification();
                 openSuccessConfirmGraduateNotification();
             } else {
                 closeProcessingConfirmGraduateNotification();
                 openFailConfirmGraduateNotification();
             }
         }

        /**
         * STUDENT UNCONFIRM GRADUATE OPERATION
         */

         let [isOpenProcessingUnConfirmGraduateNotification, setIsOpenProcessingUnConfirmGraduateNotification] = useState(false);

         function closeProcessingUnConfirmGraduateNotification() {
             setIsOpenProcessingUnConfirmGraduateNotification(false);
         }

         function openProcessingUnConfirmGraduateNotification() {
             setIsOpenProcessingUnConfirmGraduateNotification(true);
         }

         let [isOpenSuccessUnConfirmGraduateNotification, setIsOpenSuccessUnConfirmGraduateNotification] = useState(false);

         function closeSuccessUnConfirmGraduateNotification() {
             setIsOpenSuccessUnConfirmGraduateNotification(false);
             router.push("/teacher/student/graduation/operations").then(() => router.reload());
         }

         function openSuccessUnConfirmGraduateNotification() {
             setIsOpenSuccessUnConfirmGraduateNotification(true);
         }

         let [isOpenFailUnConfirmGraduateNotification, setIsOpenFailUnConfirmGraduateNotification] = useState(false);

         function closeFailUnConfirmGraduateNotification() {
             setIsOpenFailUnConfirmGraduateNotification(false);
         }

         function openFailUnConfirmGraduateNotification() {
             setIsOpenFailUnConfirmGraduateNotification(true);
         }

         const studentUnConfirmGraduate = async (event) => {
             openProcessingUnConfirmGraduateNotification();

             event.preventDefault();

             const {graduationId} = studentGraduation;
             const studentData = await StudentGraduationController.unConfirmStudentGraduation(operationUserId, graduationId);
             if (studentData.success) {
                 closeProcessingUnConfirmGraduateNotification();
                 openSuccessUnConfirmGraduateNotification();
             } else {
                 closeProcessingUnConfirmGraduateNotification();
                 openFailUnConfirmGraduateNotification();
             }
         }


    return (
        <>
            <SISTitle/>
            <TeacherNavbar/>
            <div className="max-w-7xl select-none py-5 mx-auto space-y-6">
                <div className="mt-5 md:mt-0 md:col-span-2">
                    <div className="px-12 py-10 text-left bg-gray-50 rounded-2xl shadow-xl">
                        <a className="select-none font-phenomenaExtraBold text-left text-4xl text-sis-darkblue">
                            {studentInfoResponse.name} {studentInfoResponse.surname}
                        </a>
                        {StudentGraduationStatus.getAll.map((studentStatus) => (
                            studentGraduation.status === studentStatus.enum
                                ?
                                studentStatus.component
                                :
                                null
                        ))}
                        {(
                            teacherRole !== TeacherRole.HEAD_OF_DEPARTMENT
                                ?
                                <button
                                    onClick={studentRejectGraduate}
                                    type="submit"
                                    className="font-phenomenaBold float-right ml-2 py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-fail hover:bg-sis-darkblue"
                                >
                                    MEZUN??YET ????LEM??N?? REDDET
                                </button>
                                :
                                <button
                                    onClick={studentUnConfirmGraduate}
                                    type="submit"
                                    className="font-phenomenaBold float-right ml-2 py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-fail hover:bg-sis-darkblue"
                                >
                                    MEZUN??YET ????LEM??N?? REDDET
                                </button>
                        )}
                        {(
                            teacherRole !== TeacherRole.ADVISOR
                                ?
                                null
                                :
                                <button
                                    onClick={studentApprovedGraduate}
                                    type="submit"
                                    className="font-phenomenaBold float-right ml-2 py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-success hover:bg-sis-darkblue"
                                >
                                    MEZUN??YET ????LEM??N?? ONAYLA
                                </button>
                        )}
                        {(
                            teacherRole !== TeacherRole.HEAD_OF_DEPARTMENT
                                ?
                                null
                                :
                                <button
                                    onClick={studentConfirmGraduate}
                                    type="submit"
                                    className="font-phenomenaBold float-right ml-2 py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-success hover:bg-sis-darkblue"
                                >
                                    MEZUN??YET ????LEM??N?? KES??NLE??T??R
                                </button>
                        )}

                    </div>
                    <div className="md:col-span-1">
                        <form className="mt-8 max-w-3xl mx-auto space-y-6">
                            <div className="shadow sm:rounded-md sm:overflow-hidden">
                                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                                    <div className="mb-6 px-4 sm:px-0 bg-gray-50 rounded-xl">
                                        <h3 className="py-8 font-phenomenaExtraBold leading-6 text-sis-darkblue text-center text-3xl">
                                            AKADEM??K B??LG??LER
                                        </h3>
                                    </div>
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="sm:col-span-3">
                                            <label htmlFor="student-number"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                ????RENC?? NUMARASI
                                            </label>
                                            <input
                                                type="text"
                                                name="studentId"
                                                id="studentId"
                                                defaultValue={studentInfoResponse.studentId}
                                                disabled
                                                className="font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="first-name"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                ADI
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                defaultValue={studentInfoResponse.name}
                                                disabled
                                                className="font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="last-name"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                SOYADI
                                            </label>
                                            <input
                                                type="text"
                                                name="surname"
                                                id="surname"
                                                disabled
                                                defaultValue={studentInfoResponse.surname}
                                                className="font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                />
                                        </div>


                                        <div className="sm:col-span-3 select-none">
                                            <label htmlFor="registration-date"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                KAYIT TAR??H??
                                            </label>
                                            <input
                                                type="text"
                                                name="registration-date"
                                                id="registration-date"
                                                defaultValue={studentInfoResponse.registrationDate}
                                                disabled
                                                className="font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="faculty"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                FAK??LTES??
                                            </label>
                                            <select
                                                id="faculty"
                                                name="faculty"
                                                autoComplete="faculty-name"
                                                disabled
                                                defaultValue={facultyResponse.name}
                                                className="font-phenomenaRegular text-gray-500 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                            >
                                                <option
                                                    value={facultyResponse.facultyId}>{facultyResponse.name}</option>
                                            </select>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="departmentId"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                B??L??M??
                                            </label>
                                            <select
                                                id="departmentId"
                                                name="department-id"
                                                autoComplete="department-id"
                                                disabled
                                                className="font-phenomenaRegular text-gray-500 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                                >
                                                <option value={departmentResponse.departmentId}>{departmentResponse.name}</option>
                                            </select>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="degree"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                DERECES??
                                            </label>
                                            <select
                                                id="degree"
                                                name="degree"
                                                autoComplete="degree"
                                                disabled
                                                className="font-phenomenaRegular text-gray-500 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                            >
                                                {StudentDegree.getAll.map((sDegree) => (
                                                    studentInfoResponse.degree === sDegree.enum
                                                        ?
                                                        <option>{sDegree.tr}</option>
                                                        :
                                                        null
                                                ))}

                                            </select>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="student-class"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                SINIF
                                            </label>
                                            <select
                                                id="classLevel"
                                                name="classLevel"
                                                disabled
                                                className="font-phenomenaRegular text-gray-500 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                                >
                                                {StudentClassLevel.getAll.map((sClassLevel) => (
                                                    studentInfoResponse.classLevel === sClassLevel.enum
                                                        ?
                                                        <option>{sClassLevel.tr}</option>
                                                        :
                                                        null
                                                ))}
                                            </select>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="email-address"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                E-MA??L ADRES??
                                            </label>
                                            <input
                                                type="text"
                                                name="email-address"
                                                id="email-address"
                                                defaultValue={studentInfoResponse.email}
                                                disabled
                                                className="font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/**
                                 * Approved Graduate
                                 */}
                                <ProcessNotification
                                    isOpen={isOpenProcessingApprovedGraduateNotification}
                                    closeNotification={closeProcessingApprovedGraduateNotification}
                                    title="????renci Mezuniyet ????lemi Onaylan??yor..."
                                />

                                <SuccessNotification
                                    isOpen={isOpenSuccessApprovedGraduateNotification}
                                    closeNotification={closeSuccessApprovedGraduateNotification}
                                    title="????renci Mezuniyet ????lemi Onayland??!"
                                    description="????renci Mezuniyet ????lemi ba??ar??yla Oanyland??."
                                />

                                <FailNotification
                                    isOpen={isOpenFailApprovedGraduateNotification}
                                    closeNotification={closeFailApprovedGraduateNotification}
                                    title="????renci Mezuniyet ????lemi Onaylanamad??!"
                                    description="Sistemsel bir hatadan dolay?? iste??iniz sonu??land??ralamam???? olabilir."
                                />

                                {/**
                                 * Reject Graduate
                                 */}
                                <ProcessNotification
                                    isOpen={isOpenProcessingRejectedGraduateNotification}
                                    closeNotification={closeProcessingRejectedGraduateNotification}
                                    title="????renci Mezuniyet ????lemi Reddediliyor..."
                                />

                                <SuccessNotification
                                    isOpen={isOpenSuccessRejectedGraduateNotification}
                                    closeNotification={closeSuccessRejectedGraduateNotification}
                                    title="????renci Mezuniyet ????lemi Reddedildi!"
                                    description="????renci Mezuniyet ????lemi ba??ar??yla Reddedildi."
                                />

                                <FailNotification
                                    isOpen={isOpenFailRejectedGraduateNotification}
                                    closeNotification={closeFailRejectedGraduateNotification}
                                    title="????renci Mezuniyet ????lemi Reddedilemedi!"
                                    description="Sistemsel bir hatadan dolay?? iste??iniz sonu??land??ralamam???? olabilir."
                                />

                                {/**
                                 * Confirm Graduate
                                 */}
                                <ProcessNotification
                                    isOpen={isOpenProcessingConfirmGraduateNotification}
                                    closeNotification={closeProcessingConfirmGraduateNotification}
                                    title="????renci Mezuniyet ????lemi Kesinle??tiriliyor..."
                                />

                                <SuccessNotification
                                    isOpen={isOpenSuccessConfirmGraduateNotification}
                                    closeNotification={closeSuccessConfirmGraduateNotification}
                                    title="????renci Mezuniyet ????lemi Kesinle??tirildi!"
                                    description="????renci Mezuniyet ????lemi ba??ar??yla Kesinle??tirildi."
                                />

                                <FailNotification
                                    isOpen={isOpenFailConfirmGraduateNotification}
                                    closeNotification={closeFailConfirmGraduateNotification}
                                    title="????renci Mezuniyet ????lemi Kesinle??tirilemedi!"
                                    description="Sistemsel bir hatadan dolay?? iste??iniz sonu??land??ralamam???? olabilir."
                                />


                                {/**
                                 * UnConfirm Graduate
                                 */}
                                <ProcessNotification
                                    isOpen={isOpenProcessingUnConfirmGraduateNotification}
                                    closeNotification={closeProcessingUnConfirmGraduateNotification}
                                    title="????renci Mezuniyet ????lemi Reddediliyor..."
                                />

                                <SuccessNotification
                                    isOpen={isOpenSuccessUnConfirmGraduateNotification}
                                    closeNotification={closeSuccessUnConfirmGraduateNotification}
                                    title="????renci Mezuniyet ????lemi Reddedildi!"
                                    description="????renci Mezuniyet ????lemi ba??ar??yla Reddedildi."
                                />

                                <FailNotification
                                    isOpen={isOpenFailUnConfirmGraduateNotification}
                                    closeNotification={closeFailUnConfirmGraduateNotification}
                                    title="????renci Mezuniyet ????lemi Reddedilemedi!"
                                    description="Sistemsel bir hatadan dolay?? iste??iniz sonu??land??ralamam???? olabilir."
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}