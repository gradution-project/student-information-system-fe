import SISTitle from "../../../../../../../public/components/page-titles";
import OfficerNavbar from "../../../../../../../public/components/navbar/officer/officer-navbar";
import {useState} from "react";
import {useRouter} from "next/router";
import {lessonCompulsory, lessonSemesters, lessonStatuses} from "../../../../../../../public/constants/lesson";
import {getOfficerNumberWithContext} from "../../../../../../../public/storage/officer";
import UnauthorizedAccessPage from "../../../../../../401";
import ProcessNotification from "../../../../../../../public/notifications/process";
import SuccessNotification from "../../../../../../../public/notifications/success";
import FailNotification from "../../../../../../../public/notifications/fail";

export async function getServerSideProps(context) {
    const officerId = getOfficerNumberWithContext(context)
    if (officerId === undefined) {
        return {
            props: {
                isPagePermissionSuccess: false
            }
        }
    }

    const SIS_API_URL = process.env.SIS_API_URL;
    const {id} = context.query;
    const departmentResponses = await fetch(`${SIS_API_URL}/department?status=ACTIVE`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    const lessonResponse = await fetch(`${SIS_API_URL}/lesson/` + id, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });

    const departmentDatas = await departmentResponses.json();
    const lessonData = await lessonResponse.json();
    if (lessonData.success && departmentDatas.success) {
        return {
            props: {
                isPagePermissionSuccess: true,
                operationUserId: officerId,
                SIS_API_URL: SIS_API_URL,
                departments: departmentDatas.response,
                lesson: lessonData.response
            }
        }
    }
}


export default function LessonDetail({isPagePermissionSuccess, operationUserId, SIS_API_URL, departments, lesson}) {

    if (!isPagePermissionSuccess) {
        return (
            <UnauthorizedAccessPage user="officer"/>
        )
    }

    const {lessonId, name, credit, semester, compulsoryOrElective, status, departmentResponse, modifiedDate} = lesson;
    const {facultyResponse} = departmentResponse;

    const departmentId = departmentResponse.departmentId;
    const facultyId = facultyResponse.facultyId;
    const facultyName = facultyResponse.name;
    const departmentName = departmentResponse.name;


    const router = useRouter();

    const [lessonName, setLessonName] = useState(name);
    const changeLessonName = event => {
        const lessonName = event.target.value;
        setLessonName(lessonName);
    }

    const [lessonCredit, setLessonCredit] = useState(credit);
    const changeLessonCredit = event => {
        const lessonCredit = event.target.value;
        setLessonCredit(lessonCredit);
    }

    const [lessonCorE, setLessonCorE] = useState(compulsoryOrElective);
    const changeLessonCorE = event => {
        const lessonCorE = event.target.value;
        setLessonCorE(lessonCorE);
    }

    const [lessonSemester, setLessonSemester] = useState(semester);
    const changeLessonSemester = event => {
        const lessonSemester = event.target.value;
        setLessonSemester(lessonSemester);
    }


    const [lessonDepartmentId, setLessonDepartmentId] = useState(departmentId);
    const changeLessonDepartmentId = event => {
        const lessonDepartmentId = event.target.value;
        setLessonDepartmentId(lessonDepartmentId);
    }


    let [isOpenProcessingActivateNotification, setIsOpenProcessingActivateNotification] = useState(false);

    function closeProcessingNotificationActivateNotification() {
        setIsOpenProcessingActivateNotification(false);
    }

    function openProcessingNotificationActivateNotification() {
        setIsOpenProcessingActivateNotification(true);
    }

    let [isOpenSuccessActivateNotification, setIsOpenSuccessActivateNotification] = useState(false);

    function closeSuccessNotificationActivateNotification() {
        setIsOpenSuccessActivateNotification(false);
        router.reload();
    }

    function openSuccessNotificationActivateNotification() {
        setIsOpenSuccessActivateNotification(true);
    }

    let [isOpenFailActivateNotification, setIsOpenFailActivateNotification] = useState(false);

    function closeFailNotificationActivateNotification() {
        setIsOpenFailActivateNotification(false);
    }

    function openFailNotificationActivateNotification() {
        setIsOpenFailActivateNotification(true);
    }

    const lessonActivate = async (event) => {
        openProcessingNotificationActivateNotification();

        event.preventDefault()
        const activateRes = await fetch(`${SIS_API_URL}/lesson/activate`, {
            headers: {'Content-Type': 'application/json'},
            method: 'PATCH',
            body: JSON.stringify({
                operationInfoRequest: {
                    userId: operationUserId
                },
                lessonId: lessonId
            }),
        });
        const activateData = await activateRes.json();
        if (activateData.success) {
            closeProcessingNotificationActivateNotification();
            openSuccessNotificationActivateNotification();
        } else {
            closeProcessingNotificationActivateNotification();
            openFailNotificationActivateNotification();
        }
    }


    let [isOpenProcessingPassivateNotification, setIsOpenProcessingPassivateNotification] = useState(false);

    function closeProcessingNotificationPassivateNotification() {
        setIsOpenProcessingPassivateNotification(false);
    }

    function openProcessingNotificationPassivateNotification() {
        setIsOpenProcessingPassivateNotification(true);
    }

    let [isOpenSuccessPassivateNotification, setIsOpenSuccessPassivateNotification] = useState(false);

    function closeSuccessNotificationPassivateNotification() {
        setIsOpenSuccessPassivateNotification(false);
        router.reload();
    }

    function openSuccessNotificationPassivateNotification() {
        setIsOpenSuccessPassivateNotification(true);
    }

    let [isOpenFailPassivateNotification, setIsOpenFailPassivateNotification] = useState(false);

    function closeFailNotificationPassivateNotification() {
        setIsOpenFailPassivateNotification(false);
    }

    function openFailNotificationPassivateNotification() {
        setIsOpenFailPassivateNotification(true);
    }

    const lessonPassivate = async (event) => {
        openProcessingNotificationPassivateNotification();

        event.preventDefault()
        const passivateRes = await fetch(`${SIS_API_URL}/lesson/passivate`, {
            headers: {'Content-Type': 'application/json'},
            method: 'PATCH',
            body: JSON.stringify({
                operationInfoRequest: {
                    userId: operationUserId
                },
                lessonId: lessonId
            }),
        });
        const passivateData = await passivateRes.json();
        if (passivateData.success) {
            closeProcessingNotificationPassivateNotification();
            openSuccessNotificationPassivateNotification();
        } else {
            closeProcessingNotificationPassivateNotification();
            openFailNotificationPassivateNotification();
        }
    }


    let [isOpenProcessingDeleteNotification, setIsOpenProcessingDeleteNotification] = useState(false);

    function closeProcessingNotificationDeleteNotification() {
        setIsOpenProcessingDeleteNotification(false);
    }

    function openProcessingNotificationDeleteNotification() {
        setIsOpenProcessingDeleteNotification(true);
    }

    let [isOpenSuccessDeleteNotification, setIsOpenSuccessDeleteNotification] = useState(false);

    function closeSuccessNotificationDeleteNotification() {
        setIsOpenSuccessDeleteNotification(false);
        router.reload();
    }

    function openSuccessNotificationDeleteNotification() {
        setIsOpenSuccessDeleteNotification(true);
    }

    let [isOpenFailDeleteNotification, setIsOpenFailDeleteNotification] = useState(false);

    function closeFailNotificationDeleteNotification() {
        setIsOpenFailDeleteNotification(false);
    }

    function openFailNotificationDeleteNotification() {
        setIsOpenFailDeleteNotification(true);
    }

    const lessonDelete = async (event) => {
        openProcessingNotificationDeleteNotification();

        event.preventDefault()
        const deleteRes = await fetch(`${SIS_API_URL}/lesson/delete`, {
            headers: {'Content-Type': 'application/json'},
            method: 'DELETE',
            body: JSON.stringify({
                operationInfoRequest: {
                    userId: operationUserId
                },
                lessonId: lessonId
            }),
        });
        const deleteData = await deleteRes.json();
        if (deleteData.success) {
            closeProcessingNotificationDeleteNotification();
            openSuccessNotificationDeleteNotification()
        } else {
            closeProcessingNotificationDeleteNotification();
            openFailNotificationDeleteNotification();
        }
    }


    let [isOpenProcessingNotification, setIsOpenProcessingNotification] = useState(false);

    function closeProcessingNotification() {
        setIsOpenProcessingNotification(false);
    }

    function openProcessingNotification() {
        setIsOpenProcessingNotification(true);
    }

    let [isOpenSuccessNotification, setIsOpenSuccessNotification] = useState(false);

    function closeSuccessNotification() {
        setIsOpenSuccessNotification(false);
        router.reload();
    }

    function openSuccessNotification() {
        setIsOpenSuccessNotification(true);
    }

    let [isOpenFailNotification, setIsOpenFailNotification] = useState(false);

    function closeFailNotification() {
        setIsOpenFailNotification(false);
    }

    function openFailNotification() {
        setIsOpenFailNotification(true);
    }

    const lessonUpdate = async (event) => {
        openProcessingNotification();

        event.preventDefault()
        const updateRes = await fetch(`${SIS_API_URL}/lesson/update/${lessonId}`, {
            headers: {'Content-Type': 'application/json'},
            method: 'PUT',
            body: JSON.stringify({
                lessonInfoRequest: {
                    compulsoryOrElective: lessonCorE,
                    credit: lessonCredit,
                    departmentId: lessonDepartmentId,
                    name: lessonName,
                    semester: lessonSemester
                },
                operationInfoRequest: {
                    userId: operationUserId
                }
            }),
        });
        const updateData = await updateRes.json();
        if (updateData.success) {
            closeProcessingNotification();
            openSuccessNotification()
        } else {
            closeProcessingNotification();
            openFailNotification();
        }
    }

    return (
        <>
            <SISTitle/>
            <OfficerNavbar/>
            <div>
                <div className="select-none px-28 py-5 mx-auto space-y-6">
                    <div className="px-12 py-10 text-left bg-gray-50 rounded-2xl shadow-xl">
                        <a className="select-none font-phenomenaExtraBold text-left text-4xl text-sis-darkblue">
                            {name}
                        </a>
                        {lessonStatuses.map((lessonStatus) => (
                            status === lessonStatus.enum
                                ?
                                lessonStatus.component
                                :
                                null
                        ))}
                        {(
                            status !== 'DELETED'
                                ?
                                <button
                                    onClick={lessonDelete}
                                    type="submit"
                                    className="block float-right font-phenomenaBold ml-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-red-600 hover:bg-sis-darkblue"
                                >
                                    DERSİ SİL
                                </button>
                                :
                                null
                        )}

                        {(
                            status !== 'PASSIVE' && status !== 'DELETED'
                                ?
                                <button
                                    onClick={lessonPassivate}
                                    type="submit"
                                    className="float-right font-phenomenaBold ml-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-yellow hover:bg-sis-darkblue"
                                >
                                    DERSİ PASİFLEŞTİR
                                </button>
                                :
                                null
                        )}

                        {(
                            status !== 'ACTIVE' && status !== 'DELETED'
                                ?
                                <button
                                    onClick={lessonActivate}
                                    type="submit"
                                    className="float-right font-phenomenaBold inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-success hover:bg-sis-darkblue"
                                >
                                    DERSİ AKTİFLEŞTİR
                                </button>
                                :
                                null
                        )}
                    </div>
                    <div className="md:col-span-1">
                        <form className="mt-5 px-4 max-w-3xl mx-auto space-y-6">
                            <div className="shadow sm:rounded-md sm:overflow-hidden">
                                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                                    <div className="mb-6 px-4 sm:px-0 bg-gray-50 rounded-xl">
                                        <h3 className="py-8 font-phenomenaExtraBold leading-6 text-sis-darkblue text-center text-3xl">
                                            DERS BİLGİLERİ
                                        </h3>
                                    </div>
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="sm:col-span-3">
                                            <label htmlFor="lessonId"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                DERS NUMARASI
                                            </label>
                                            <input
                                                type="text"
                                                name="lessonId"
                                                id="lessonId"
                                                defaultValue={lessonId}
                                                disabled
                                                className="font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="faculty"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                FAKÜLTE ADI
                                            </label>
                                            <select
                                                id="faculty"
                                                name="faculty"
                                                autoComplete="faculty-name"
                                                disabled
                                                className="font-phenomenaRegular text-gray-500 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                            >
                                                <option defaultValue={facultyId}>{facultyName}</option>
                                            </select>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="department"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                BÖLÜMÜ
                                            </label>
                                            <select
                                                onChange={changeLessonDepartmentId}
                                                id="department-id"
                                                name="department-id"
                                                autoComplete="department-id"
                                                disabled={status === "DELETED" || status === "PASSIVE"}
                                                className={status === "DELETED" || status === "PASSIVE"
                                                    ? "font-phenomenaRegular text-gray-500 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                                    : "font-phenomenaRegular text-gray-700 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                                }>
                                                {departments.map((department) => (
                                                    departmentName === department.name
                                                        ?
                                                        <option value={department.departmentId}
                                                                selected>{department.name}</option>
                                                        :
                                                        <option
                                                            value={department.departmentId}>{department.name}</option>
                                                ))}
                                            </select>
                                        </div>


                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="name"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                DERSİN ADI
                                            </label>
                                            <input
                                                onChange={changeLessonName}
                                                type="text"
                                                name="name"
                                                id="name"
                                                required
                                                defaultValue={name}
                                                disabled={status === "DELETED" || status === "PASSIVE"}
                                                className={status === "DELETED" || status === "PASSIVE"
                                                    ? "font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                    : "font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                }/>
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="credit"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                DERSİN KREDİSİ
                                            </label>
                                            <input
                                                onChange={changeLessonCredit}
                                                type="text"
                                                name="credit"
                                                id="credit"
                                                required
                                                defaultValue={credit}
                                                disabled={status === "DELETED" || status === "PASSIVE"}
                                                className={status === "DELETED" || status === "PASSIVE"
                                                    ? "font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                    : "font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                }/>
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="semester"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                DERS DÖNEMİ
                                            </label>
                                            <select
                                                onChange={changeLessonSemester}
                                                id="semester"
                                                name="semester"
                                                disabled={status === "DELETED" || status === "PASSIVE"}
                                                className={status === "DELETED" || status === "PASSIVE"
                                                    ? "font-phenomenaRegular text-gray-500 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                                    : "font-phenomenaRegular text-gray-700 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                                }>
                                                {lessonSemesters.map(lSemester => (
                                                    semester === lSemester.enum
                                                        ?
                                                        <option value={lSemester.enum} selected>{lSemester.tr}</option>
                                                        :
                                                        <option value={lSemester.enum}>{lSemester.tr}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="compulsoryOrElective"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                DERS ZORUNLULUĞU
                                            </label>
                                            <select
                                                onChange={changeLessonCorE}
                                                id="compulsoryOrElective"
                                                name="compulsoryOrElective"
                                                disabled={status === "DELETED" || status === "PASSIVE"}
                                                className={status === "DELETED" || status === "PASSIVE"
                                                    ? "font-phenomenaRegular text-gray-500 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                                    : "font-phenomenaRegular text-gray-700 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                                }>
                                                {lessonCompulsory.map((lCompulsory) => (
                                                    compulsoryOrElective === lCompulsory.enum
                                                        ?
                                                        <option value={lCompulsory.enum}
                                                                selected>{lCompulsory.tr}</option>
                                                        :
                                                        <option value={lCompulsory.enum}>{lCompulsory.tr}</option>

                                                ))}
                                            </select>
                                        </div>

                                        {(
                                            modifiedDate !== null
                                                ?
                                                <div className="sm:col-span-6">
                                                    <a className="font-phenomenaRegular text-sis-blue text-xl">
                                                        Son Düzenlenme Tarihi : {modifiedDate}
                                                    </a>
                                                </div>
                                                :
                                                null
                                        )}
                                    </div>
                                </div>
                                {(
                                    status !== "DELETED" && status !== "PASSIVE"
                                        ?
                                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                            <button
                                                onClick={lessonUpdate}
                                                type="submit"
                                                className=" font-phenomenaBold inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-yellow hover:bg-sis-darkblue"
                                            >
                                                GÜNCELLE
                                            </button>
                                        </div>
                                        :
                                        null
                                )}

                                {/**
                                 * Activate
                                 */}
                                <ProcessNotification
                                    isOpen={isOpenProcessingActivateNotification}
                                    closeNotification={closeProcessingNotificationActivateNotification}
                                    title="Ders Aktifleştirme İsteğiniz İşleniyor..."
                                />

                                <SuccessNotification
                                    isOpen={isOpenSuccessActivateNotification}
                                    closeNotification={closeSuccessNotificationActivateNotification}
                                    title="Ders Aktifleştime İşlemi Başarılı!"
                                    description="Ders Aktifleştirildi."
                                />

                                <FailNotification
                                    isOpen={isOpenFailActivateNotification}
                                    closeNotification={closeFailNotificationActivateNotification}
                                    title="Ders Aktifleştirme İşlemi Başarısız!"
                                    description="Sistemsel bir hatadan dolayı isteğiniz sonuçlandıralamamış olabilir."
                                />

                                {/**
                                 * Passivate
                                 */}
                                <ProcessNotification
                                    isOpen={isOpenProcessingPassivateNotification}
                                    closeNotification={closeProcessingNotificationPassivateNotification}
                                    title="Ders Bilgi Güncelleme İsteğiniz İşleniyor..."
                                />

                                <SuccessNotification
                                    isOpen={isOpenSuccessPassivateNotification}
                                    closeNotification={closeSuccessNotificationPassivateNotification}
                                    title="Ders Pasifleştirme İşlemi Başarılı!"
                                    description="Ders Pasifleştirildi."
                                />

                                <FailNotification
                                    isOpen={isOpenFailPassivateNotification}
                                    closeNotification={closeFailNotificationPassivateNotification}
                                    title="Ders Pasifleştirme İşlemi Başarısız!"
                                    description="Sistemsel bir hatadan dolayı isteğiniz sonuçlandıralamamış olabilir."
                                />

                                {/**
                                 * Delete
                                 */}
                                <ProcessNotification
                                    isOpen={isOpenProcessingDeleteNotification}
                                    closeNotification={closeProcessingNotificationDeleteNotification}
                                    title="Ders Silme İsteğiniz İşleniyor..."
                                />

                                <SuccessNotification
                                    isOpen={isOpenSuccessDeleteNotification}
                                    closeNotification={closeSuccessNotificationDeleteNotification}
                                    title="Ders Sime İşlemi Başarılı!"
                                    description="Ders Silindi."
                                />

                                <FailNotification
                                    isOpen={isOpenFailDeleteNotification}
                                    closeNotification={closeFailNotificationDeleteNotification}
                                    title="Ders Silme İşlemi Başarısız!"
                                    description="Sistemsel bir hatadan dolayı isteğiniz sonuçlandıralamamış olabilir."
                                />

                                {/**
                                 * Update
                                 */}
                                <ProcessNotification
                                    isOpen={isOpenProcessingNotification}
                                    closeNotification={closeProcessingNotification}
                                    title="Ders Bilgi Güncelleme İsteğiniz İşleniyor..."
                                />

                                <SuccessNotification
                                    isOpen={isOpenSuccessNotification}
                                    closeNotification={closeSuccessNotification}
                                    title="Ders Bilgi Güncelleme İşlemi Başarılı!"
                                    description="Ders Bilgi Güncellene İşlemi başarıyla gerçekleşti."
                                />

                                <FailNotification
                                    isOpen={isOpenFailNotification}
                                    closeNotification={closeFailNotification}
                                    title="Ders Bilgi Güncelleme İşlemi Başarısız!"
                                    description="Lütfen girdiğiniz verileri kontrol ediniz.
                                        Verilerinizi doğru girdiyseniz
                                        sistemsel bir hatadan dolayı isteğiniz sonuçlandıralamamış olabilir."
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}