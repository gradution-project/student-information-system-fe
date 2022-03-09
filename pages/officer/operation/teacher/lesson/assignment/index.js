import {useState} from "react";
import {useRouter} from "next/router";
import SISTitle from "../../../../../../public/components/page-titles";
import OfficerNavbar from "../../../../../../public/components/navbar/officer/officer-navbar";
import ProcessNotification from "../../../../../../public/notifications/process";
import SuccessNotification from "../../../../../../public/notifications/success";
import FailNotification from "../../../../../../public/notifications/fail";
import UnauthorizedAccessPage from "../../../../../401";
import SisOfficerStorage from "../../../../../../public/storage/officer/SisOfficerStorage";

export async function getServerSideProps(context) {
    const officerId = SisOfficerStorage.getNumberWithContext(context);
    if (officerId === undefined) {
        return {
            props: {
                isPagePermissionSuccess: false
            }
        }
    }

    const SIS_API_URL = process.env.SIS_API_URL;
    return {
        props: {
            isPagePermissionSuccess: true,
            operationUserId: officerId,
            SIS_API_URL: SIS_API_URL
        }
    }
}

export default function LessonAssignment({isPagePermissionSuccess, operationUserId, SIS_API_URL}) {

    if (!isPagePermissionSuccess) {
        return (
            <UnauthorizedAccessPage user="officer"/>
        )
    }

    const router = useRouter();

    let [isOpenProcessingAssignmentNotification, setIsOpenProcessingAssignmentNotification] = useState(false);

    function closeProcessingAssignmentNotification() {
        setIsOpenProcessingAssignmentNotification(false);
    }

    function openProcessingAssignmentNotification() {
        setIsOpenProcessingAssignmentNotification(true);
    }

    let [isOpenSuccessAssignmentNotification, setIsOpenSuccessAssignmentNotification] = useState(false);

    function closeSuccessAssignmentNotification() {
        setIsOpenSuccessAssignmentNotification(false);
        router.push("/officer/operation/teacher/lesson").then(() => router.reload());
    }

    function openSuccessAssignmentNotification() {
        setIsOpenSuccessAssignmentNotification(true);
    }

    let [isOpenFailAssignmentNotification, setIsOpenFailAssignmentNotification] = useState(false);

    function closeFailAssignmentNotification() {
        setIsOpenFailAssignmentNotification(false);
    }

    function openFailAssignmentNotification() {
        setIsOpenFailAssignmentNotification(true);
    }


    const [lessonNumber, setLessonNumber] = useState();
    const changeLessonNumber = event => {
        const lessonNumber = event.target.value;
        setLessonNumber(lessonNumber);
    }

    const [teacherNumber, setTeacherNumber] = useState();
    const changeTeacherNumber = event => {
        const teacherNumber = event.target.value;
        setTeacherNumber(teacherNumber);
    }

    const lessonAssignment = async (event) => {
        openProcessingAssignmentNotification();

        event.preventDefault();

        const saveRes = await fetch(`${SIS_API_URL}/teacher/lesson/save`, {
            body: JSON.stringify({
                operationInfoRequest: {
                    userId: operationUserId
                },
                teacherLessonInfoRequest: {
                    lessonId: lessonNumber,
                    teacherId: teacherNumber
                }
            }),
            headers: {'Content-Type': 'application/json'},
            method: 'POST'
        });
        const saveData = await saveRes.json();
        if (saveData.success) {
            closeProcessingAssignmentNotification();
            openSuccessAssignmentNotification();
        } else {
            closeProcessingAssignmentNotification();
            openFailAssignmentNotification();
        }
    }

    return (
        <div>
            <SISTitle/>
            <OfficerNavbar/>
            <div className="select-none sm:mt-5">
                <div className="mt-5 md:mt-0 md:col-span-2">
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <form className="px-4 py-5 max-w-2xl mx-auto space-y-6" onSubmit={lessonAssignment}>
                            <div className="shadow overflow-hidden sm:rounded-md">
                                <div className="bg-white sm:p-6">
                                    <div className="px-4 sm:px-0 bg-gray-50 rounded-xl">
                                        <h3 className="mb-8 py-8 font-phenomenaExtraBold leading-6 text-sis-darkblue text-center text-4xl">
                                            DERS ATAMA
                                        </h3>
                                    </div>
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="last-name"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                ÖĞRETMEN NUMARASI
                                            </label>
                                            <input
                                                onChange={changeTeacherNumber}
                                                type="text"
                                                name="teacher-number"
                                                id="teacher-number"
                                                minLength="8"
                                                maxLength="8"
                                                pattern="[0-9]+"
                                                required
                                                className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="first-name"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                DERS NUMARASI
                                            </label>
                                            <input
                                                onChange={changeLessonNumber}
                                                type="text"
                                                name="lesson-number"
                                                id="lesson-number"
                                                required
                                                minLength="8"
                                                maxLength="8"
                                                pattern="[0-9]+"
                                                className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <button
                                        type="submit"
                                        className=" font-phenomenaBold inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-success hover:bg-green-600"
                                    >
                                        DERSİ ATA
                                    </button>
                                </div>

                                <ProcessNotification
                                    isOpen={isOpenProcessingAssignmentNotification}
                                    closeNotification={closeProcessingAssignmentNotification}
                                    title="Ders Atama İşlemi Gerçekleştiriiliyor..."
                                />

                                <SuccessNotification
                                    isOpen={isOpenSuccessAssignmentNotification}
                                    closeNotification={closeSuccessAssignmentNotification}
                                    title="Ders Atama İşlemi Başarılı!"
                                    description="Ders Atama İşlemi başarıyla gerçekleşti.
                                    Mesaj penceresini kapattıktan sonra 
                                    Öğretmen Ders Listeleme ekranına yönlendirileceksiniz."
                                />

                                <FailNotification
                                    isOpen={isOpenFailAssignmentNotification}
                                    closeNotification={closeFailAssignmentNotification}
                                    title="Ders Atama İşlemi Başarısız!"
                                    description="Lütfen girdiğiniz verileri kontrol ediniz.
                                    Verilerinizi doğru girdiyseniz, daha önce girdiğiniz
                                    Öğretmen Numarasına atamak istediğiniz Ders atanmış veya
                                    sistemsel bir hatadan dolayı isteğiniz sonuçlandıralamamış olabilir."
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}