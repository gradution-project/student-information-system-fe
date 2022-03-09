import SISTitle from "../../../../../public/components/page-titles";
import OfficerNavbar from "../../../../../public/components/navbar/officer/officer-navbar";
import {useState} from "react";
import {useRouter} from "next/router";
import {lessonCompulsory, lessonSemesters} from "../../../../../public/constants/lesson";
import {getOfficerNumberWithContext} from "../../../../../public/storage/officer";
import UnauthorizedAccessPage from "../../../../401";
import ProcessNotification from "../../../../../public/notifications/process";
import SuccessNotification from "../../../../../public/notifications/success";
import FailNotification from "../../../../../public/notifications/fail";

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
    const departmentResponses = await fetch(`${SIS_API_URL}/department?status=ACTIVE`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    const departmentDatas = await departmentResponses.json();
    if (departmentDatas.success) {
        return {
            props: {
                isPagePermissionSuccess: true,
                operationUserId: officerId,
                SIS_API_URL: SIS_API_URL,
                departments: departmentDatas.response
            }
        }
    }
}

export default function SaveLesson({isPagePermissionSuccess, operationUserId, SIS_API_URL, departments}) {

    if (!isPagePermissionSuccess) {
        return (
            <UnauthorizedAccessPage user="officer"/>
        )
    }

    const router = useRouter();


    let [isOpenSuccessSaveNotification, setIsOpenSuccessSaveNotification] = useState(false);

    function closeSuccessSaveNotification() {
        setIsOpenSuccessSaveNotification(false);
        router.push("/officer/operation/lesson").then(() => router.reload());
    }

    function openSuccessSaveNotification() {
        setIsOpenSuccessSaveNotification(true);
    }

    let [isOpenFailSaveNotification, setIsOpenFailSaveNotification] = useState(false);

    function closeFailSaveNotification() {
        setIsOpenFailSaveNotification(false);
    }

    function openFailSaveNotification() {
        setIsOpenFailSaveNotification(true);
    }

    let [isOpenProcessingSaveNotification, setIsOpenProcessingSaveNotification] = useState(false);

    function closeProcessingSaveNotification() {
        setIsOpenProcessingSaveNotification(false);
    }

    function openProcessingSaveNotification() {
        setIsOpenProcessingSaveNotification(true);
    }


    const [lessonName, setLessonName] = useState();
    const changeLessonName = event => {
        const lessonName = event.target.value;
        setLessonName(lessonName);
    }

    const [lessonCredit, setLessonCredit] = useState();
    const changeLessonCredit = event => {
        const lessonCredit = event.target.value;
        setLessonCredit(lessonCredit);
    }

    const [lessonCorE, setLessonCorE] = useState();
    const changeLessonCorE = event => {
        const lessonCorE = event.target.value;
        setLessonCorE(lessonCorE);
    }

    const [lessonSemester, setLessonSemester] = useState();
    const changeLessonSemester = event => {
        const lessonSemester = event.target.value;
        setLessonSemester(lessonSemester);
    }

    const [lessonDepartmentId, setLessonDepartmentId] = useState();
    const changeLessonDepartmentId = event => {
        const lessonDepartmentId = event.target.value;
        setLessonDepartmentId(lessonDepartmentId);
    }

    const lessonSave = async (event) => {
        openProcessingSaveNotification();

        event.preventDefault();

        const saveRes = await fetch(`${SIS_API_URL}/lesson/save`, {
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
            headers: {'Content-Type': 'application/json'},
            method: 'POST'
        });
        const saveData = await saveRes.json();
        if (saveData.success) {
            closeProcessingSaveNotification();
            openSuccessSaveNotification();
        } else {
            closeProcessingSaveNotification();
            openFailSaveNotification();
        }
    }

    return (
        <div>
            <SISTitle/>
            <OfficerNavbar/>
            <div className="select-none mt-10 sm:mt-0">
                <div className="mt-5 md:mt-0 md:col-span-2">
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <form className="px-4 py-5 max-w-2xl mx-auto space-y-6" onSubmit={lessonSave}>
                            <div className="shadow overflow-hidden sm:rounded-md">
                                <div className="bg-white sm:p-6">
                                    <div className="px-4 sm:px-0 bg-gray-50 rounded-xl">
                                        <h3 className="mb-8 py-8 font-phenomenaExtraBold leading-6 text-sis-darkblue text-center text-4xl">
                                            DERS EKLEME
                                        </h3>
                                    </div>
                                    <div className="grid grid-cols-6 gap-6">
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
                                                className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
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
                                                    className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                />
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
                                                className="form-select font-phenomenaRegular text-gray-700 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                            >
                                                <option>Ders Yarıyılı Seçiniz...</option>
                                                {lessonSemesters.map(lSemester => (
                                                        <option key={lSemester.enum} value={lSemester.enum}>{lSemester.tr}</option>
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
                                                    className="form-select font-phenomenaRegular text-gray-700 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                                >
                                                    <option>Ders Durumunu Seçiniz...</option>
                                                    {lessonCompulsory.map((lCompulsory) => (
                                                        <option key={lCompulsory.enum} value={lCompulsory.enum}>{lCompulsory.tr}</option>
                                                    ))}
                                                </select>
                                            </div>

                                        <div className="col-span-6 sm:col-span-6">
                                            <label htmlFor="department"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                BÖLÜM ADI
                                            </label>
                                            <select
                                                onChange={changeLessonDepartmentId}
                                                id="department-id"
                                                name="department-id"
                                                autoComplete="department-id"
                                                className="font-phenomenaRegular text-gray-700 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                            >
                                                <option>Ders Seçiniz...</option>
                                                {departments.map((department) => (
                                                        <option key={department.departmentId} value={department.departmentId}>{department.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <button
                                        type="submit"
                                        className=" font-phenomenaBold inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-success hover:bg-green-600"
                                    >
                                        KAYDET
                                    </button>
                                </div>

                                <ProcessNotification
                                    isOpen={isOpenProcessingSaveNotification}
                                    closeNotification={closeProcessingSaveNotification}
                                    title="Ders Ekleme İsteğiniz İşleniyor..."
                                />

                                <SuccessNotification
                                    isOpen={isOpenSuccessSaveNotification}
                                    closeNotification={closeSuccessSaveNotification}
                                    title="Ders Ekleme İşlemi Başarılı!"
                                    description="Ders Ekleme İşlemi başarıyla gerçekleşti.
                                    Mesaj penceresini kapattıktan sonra bölüm listeleme ekranına yönlendirileceksiniz."
                                />

                                <FailNotification
                                    isOpen={isOpenFailSaveNotification}
                                    closeNotification={closeFailSaveNotification}
                                    title="Ders Ekleme İşlemi Başarısız!"
                                    description="Lütfen girdiğiniz verileri kontrol ediniz.
                                    Verilerinizi doğru girdiyseniz
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