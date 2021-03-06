import {useState} from "react";
import {useRouter} from "next/router";
import SISTitle from "../../../../../../public/components/page-titles";
import OfficerNavbar from "../../../../../../public/components/navbar/officer/officer-navbar";
import ProcessNotification from "../../../../../../public/notifications/process";
import SuccessNotification from "../../../../../../public/notifications/success";
import FailNotification from "../../../../../../public/notifications/fail";
import UnauthorizedAccessPage from "../../../../../401";
import SisOfficerStorage from "../../../../../../public/storage/officer/SisOfficerStorage";
import TeacherLessonController from "../../../../../../public/api/teacher/lesson/TeacherLessonController";

export async function getServerSideProps(context) {
    const officerId = SisOfficerStorage.getNumberWithContext(context);
    if (officerId === undefined) {
        return {
            props: {
                isPagePermissionSuccess: false
            }
        }
    }

    return {
        props: {
            isPagePermissionSuccess: true,
            operationUserId: officerId
        }
    }
}

export default function LessonAssignment({isPagePermissionSuccess, operationUserId}) {

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

    const [lessonId, setLessonId] = useState();
    const changeLessonId = event => {
        const lessonId = event.target.value;
        setLessonId(lessonId);
    }

    const [teacherId, setTeacherId] = useState();
    const changeTeacherId = event => {
        const teacherId = event.target.value;
        setTeacherId(teacherId);
    }

    const lessonAssignment = async (event) => {
        openProcessingAssignmentNotification();

        event.preventDefault();

        const teacherLessonData = await TeacherLessonController.saveTeacherLesson(operationUserId, lessonId, teacherId);
        if (teacherLessonData.success) {
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
            <div className="select-none mt-10 py-4 sm:mt-0">
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
                                                ????RETMEN NUMARASI
                                            </label>
                                            <input
                                                onChange={changeTeacherId}
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
                                                onChange={changeLessonId}
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
                                        DERS?? ATA
                                    </button>
                                </div>

                                <ProcessNotification
                                    isOpen={isOpenProcessingAssignmentNotification}
                                    closeNotification={closeProcessingAssignmentNotification}
                                    title="Ders Atama ????lemi Ger??ekle??tiriiliyor..."
                                />

                                <SuccessNotification
                                    isOpen={isOpenSuccessAssignmentNotification}
                                    closeNotification={closeSuccessAssignmentNotification}
                                    title="Ders Atama ????lemi Ba??ar??l??!"
                                    description="Ders Atama ????lemi ba??ar??yla ger??ekle??ti.
                                    Mesaj penceresini kapatt??ktan sonra 
                                    ????retmen Ders Listeleme ekran??na y??nlendirileceksiniz."
                                />

                                <FailNotification
                                    isOpen={isOpenFailAssignmentNotification}
                                    closeNotification={closeFailAssignmentNotification}
                                    title="Ders Atama ????lemi Ba??ar??s??z!"
                                    description="L??tfen girdi??iniz verileri kontrol ediniz.
                                    Verilerinizi do??ru girdiyseniz, daha ??nce girdi??iniz
                                    ????retmen Numaras??na atamak istedi??iniz Ders atanm???? veya
                                    sistemsel bir hatadan dolay?? iste??iniz sonu??land??ralamam???? olabilir."
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}