import SISTitle from "../../../../../../../public/components/page-titles";
import OfficerNavbar from "../../../../../../../public/components/navbar/officer/officer-navbar";
import {useState} from "react";
import {useRouter} from "next/router";
import UnauthorizedAccessPage from "../../../../../../401";
import ProcessNotification from "../../../../../../../public/notifications/process";
import SuccessNotification from "../../../../../../../public/notifications/success";
import FailNotification from "../../../../../../../public/notifications/fail";
import SisOfficerStorage from "../../../../../../../public/storage/officer/SisOfficerStorage";
import DepartmentController from "../../../../../../../public/api/department/DepartmentController";
import DepartmentStatus from "../../../../../../../public/constants/department/DepartmentStatus";
import LessonScheduleFileController
    from "../../../../../../../public/api/schedule/file/lesson/LessonScheduleFileController";

export async function getServerSideProps(context) {
    const officerId = SisOfficerStorage.getNumberWithContext(context);
    if (officerId === undefined) {
        return {
            props: {
                isPagePermissionSuccess: false
            }
        }
    }

    const facultyId = SisOfficerStorage.getFacultyNumberWithContext(context);
    const departmentsData = await DepartmentController.getAllDepartmentsByStatus(DepartmentStatus.ACTIVE);
    if (departmentsData.success) {
        return {
            props: {
                isPagePermissionSuccess: true,
                operationUserId: officerId,
                facultyId: facultyId,
                departments: departmentsData.response
            }
        }
    }
}

export default function LessonScheduleFileSave({isPagePermissionSuccess, operationUserId, facultyId, departments}) {

    if (!isPagePermissionSuccess) {
        return (
            <UnauthorizedAccessPage user="officer"/>
        )
    }

    const router = useRouter();

    const [departmentId, setDepartmentId] = useState();
    const changeDepartmentId = event => {
        const departmentId = event.target.value;
        setDepartmentId(departmentId);
    }

    const [departmentName, setDepartmentName] = useState();

    const [isFileUploaded, setIsFileUploaded] = useState(false);

    const [fileViewUrl, setFileViewUrl] = useState();

    const [fileDownloadUrl, setFileDownloadUrl] = useState();

    const [lessonScheduleFileRequest, setLessonScheduleFileRequest] = useState();
    const changeLessonScheduleFile = event => {
        const formData = new FormData();
        for (let key of Object.keys(event.target.files)) {
            if (key !== 'length') {
                formData.append('document', event.target.files[key]);
            }
        }
        formData.append('facultyId', facultyId);
        formData.append('departmentId', departmentId);
        formData.append('operationUserId', operationUserId);
        setLessonScheduleFileRequest(formData);
    }

    let [isOpenSuccessSaveNotification, setIsOpenSuccessSaveNotification] = useState(false);

    function closeSuccessSaveNotification() {
        setIsOpenSuccessSaveNotification(false);
    }

    function openSuccessSaveNotification() {
        setIsOpenSuccessSaveNotification(true);
    }

    let [isOpenFailSaveNotification, setIsOpenFailSaveNotification] = useState(false);

    function closeFailSaveNotification() {
        setIsOpenFailSaveNotification(false);
        router.reload();
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

    const lessonScheduleFileSave = async (event) => {
        openProcessingSaveNotification();

        event.preventDefault();

        if (facultyId !== null && departmentId !== null) {

            const lessonScheduleFileData = await LessonScheduleFileController.saveLessonScheduleFile(lessonScheduleFileRequest);
            if (lessonScheduleFileData.success) {
                closeProcessingSaveNotification();
                openSuccessSaveNotification();

                setIsFileUploaded(true);
                setFileViewUrl(lessonScheduleFileData.response.fileViewUrl)
                setFileDownloadUrl(lessonScheduleFileData.response.fileDownloadUrl)
                setDepartmentName(lessonScheduleFileData.response.departmentResponse.name)
            } else {
                closeProcessingSaveNotification();
                openFailSaveNotification();
            }
        } else {
            closeProcessingSaveNotification();
            openFailSaveNotification();
        }
    }


    return (
        <div>
            <SISTitle/>
            <OfficerNavbar/>
            <div className="max-w-7xl select-none py-5 mx-auto space-y-6">
                {(
                    isFileUploaded
                        ?
                        <div
                            className="max-w-7xl mx-auto h-52 px-12 py-10 text-center bg-gray-50 rounded-2xl shadow-xl">
                            <a className="select-none font-phenomenaExtraBold text-4xl text-sis-darkblue">
                                {departmentName} Ders Program??
                            </a>
                            <div className="mt-10 content-center">
                                <div>
                                    <a
                                        href={fileViewUrl}
                                        className="select-none font-phenomenaBold py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-success hover:bg-green-600"
                                    >
                                        DOSYAYI G??R??NT??LE
                                    </a>
                                    <a
                                        href={fileDownloadUrl}
                                        className="select-none ml-2 font-phenomenaBold py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-success hover:bg-green-600"
                                    >
                                        DOSYAYI ??ND??R
                                    </a>
                                </div>
                            </div>
                        </div>
                        :
                        <div
                            className="max-w-7xl mx-auto h-52 px-12 py-10 text-left bg-gray-50 rounded-2xl shadow-xl">
                            <a className="select-none font-phenomenaExtraBold text-4xl text-sis-darkblue">
                                DERS PROGRAMI Y??KLEME
                            </a>
                            <div className="float-right">
                                <form className="upload" onSubmit={lessonScheduleFileSave}>
                                    <select
                                        onChange={changeDepartmentId}
                                        id="departmentNumber"
                                        name="departmentNumber"
                                        autoComplete="department-number"
                                        required
                                        className="select-none font-phenomenaRegular text-gray-700 w-full block py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                    >
                                        <option value=''>B??l??m Se??iniz...</option>
                                        {departments.map((department) => (
                                            <option key={department.departmentId}
                                                    value={department.departmentId}>{department.name}</option>
                                        ))}
                                    </select>
                                    <div className="mt-8">
                                        <input type="file" name="uploadFile" accept="application/pdf" required
                                               className="select-none mt-2" onChange={changeLessonScheduleFile}/>
                                        <button
                                            type="submit"
                                            className="select-none ml-2 font-phenomenaBold float-right py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-success hover:bg-green-600"
                                        >
                                            DOSYAYI Y??KLE
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                )}
                <form className="px-4 py-5 max-w-4xl mx-auto space-y-6">
                    <div className="shadow overflow-hidden sm:rounded-md">

                        <ProcessNotification
                            isOpen={isOpenProcessingSaveNotification}
                            closeNotification={closeProcessingSaveNotification}
                            title="Dosya Y??kleme ??ste??iniz ????leniyor..."
                        />

                        <SuccessNotification
                            isOpen={isOpenSuccessSaveNotification}
                            closeNotification={closeSuccessSaveNotification}
                            title="Dosya Y??kleme ????lemi Ba??ar??l??!"
                            description="Dosya Y??kleme ????lemi ba??ar??yla ger??ekle??ti.
                            Mesaj penceresini kapatt??ktan sonra dosya listeleme
                            ekran??na y??nlendirileceksiniz."
                        />

                        <FailNotification
                            isOpen={isOpenFailSaveNotification}
                            closeNotification={closeFailSaveNotification}
                            title="Dosya Y??kleme ????lemi Ba??ar??s??z!"
                            description="L??tfen b??l??m se??iminizi kontrol ediniz.
                            B??l??m se??tiyseniz; bu b??l??me ait ders program?? sistemde mevcut olabilir,
                            tan??ml?? olan dosyay?? sildikten sonra tekrar deneyerek ders program??
                            ekleyebilirsiniz veya sistemsel bir hatadan dolay??
                            iste??iniz sonu??land??ralamam???? olabilir,
                            dosyay?? y??kleyerek yeniden deneyebilirsiniz."
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}
