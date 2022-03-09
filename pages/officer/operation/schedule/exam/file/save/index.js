import SISTitle from "../../../../../../../public/components/page-titles";
import OfficerNavbar from "../../../../../../../public/components/navbar/officer/officer-navbar";
import {useState} from "react";
import {useRouter} from "next/router";
import {
    getOfficerFacultyNumberWithContext,
    getOfficerNumberWithContext
} from "../../../../../../../public/storage/officer";
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
    const facultyId = getOfficerFacultyNumberWithContext(context);
    const departmentResponses = await fetch(`${SIS_API_URL}/department?status=ACTIVE`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    const departmentDatas = await departmentResponses.json();
    if (departmentDatas.success) {
        return {
            props: {
                isPagePermissionSuccess: true,
                facultyId: facultyId,
                operationUserId: officerId,
                SIS_API_URL: SIS_API_URL,
                departments: departmentDatas.response
            }
        }
    }
}

export default function ExamScheduleFileSave({isPagePermissionSuccess, facultyId, operationUserId, SIS_API_URL, departments}) {

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

    const [examScheduleFileRequest, setExamScheduleFileRequest] = useState();
    const changeExamScheduleFile = event => {
        const formData = new FormData();
        for (let key of Object.keys(event.target.files)) {
            if (key !== 'length') {
                formData.append('document', event.target.files[key]);
            }
        }
        formData.append('apiUrl', SIS_API_URL);
        formData.append('facultyId', facultyId);
        formData.append('departmentId', departmentId);
        formData.append('operationUserId', operationUserId);
        setExamScheduleFileRequest(formData);
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

    const examScheduleFileSave = async (event) => {
        openProcessingSaveNotification();

        event.preventDefault();

        if (facultyId !== null && departmentId !== null) {
            const saveRes = await fetch(`${SIS_API_URL}/exam-schedule-file/save`, {
                body: examScheduleFileRequest,
                method: 'POST'
            });
            const saveData = await saveRes.json();
            if (saveData.success) {
                closeProcessingSaveNotification();
                openSuccessSaveNotification();

                setIsFileUploaded(true);
                setFileViewUrl(saveData.response.fileViewUrl)
                setFileDownloadUrl(saveData.response.fileDownloadUrl)
                setDepartmentName(saveData.response.departmentResponse.name)
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
            <div className="px-28 py-5 mx-auto space-y-6">
                {(
                    isFileUploaded
                        ?
                        <div
                            className="max-w-7xl mx-auto h-52 px-12 py-10 text-center bg-gray-50 rounded-2xl shadow-xl">
                            <a className="select-none font-phenomenaExtraBold text-4xl text-sis-darkblue">
                                {departmentName} Sınav Programı
                            </a>
                            <div className="mt-10 content-center">
                                <div>
                                    <a
                                        href={fileViewUrl}
                                        className="select-none font-phenomenaBold py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-success hover:bg-green-600"
                                    >
                                        DOSYAYI GÖRÜNTÜLE
                                    </a>
                                    <a
                                        href={fileDownloadUrl}
                                        className="select-none ml-2 font-phenomenaBold py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-success hover:bg-green-600"
                                    >
                                        DOSYAYI İNDİR
                                    </a>
                                </div>
                            </div>
                        </div>
                        :
                        <div
                            className="max-w-7xl mx-auto h-52 px-12 py-10 text-left bg-gray-50 rounded-2xl shadow-xl">
                            <a className="select-none font-phenomenaExtraBold text-4xl text-sis-darkblue">
                                SINAV PROGRAMI YÜKLEME
                            </a>
                            <div className="float-right">
                                <form className="upload" onSubmit={examScheduleFileSave}>
                                    <select
                                        onChange={changeDepartmentId}
                                        id="departmentNumber"
                                        name="departmentNumber"
                                        autoComplete="department-number"
                                        required
                                        className="select-none font-phenomenaRegular text-gray-700 w-full block py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                    >
                                        <option value=''>Bölüm Seçiniz...</option>
                                        {departments.map((department) => (
                                            <option key={department.departmentId}
                                                    value={department.departmentId}>{department.name}</option>
                                        ))}
                                    </select>
                                    <div className="mt-8">
                                        <input type="file" name="uploadFile" accept="application/pdf" required
                                               className="select-none mt-2" onChange={changeExamScheduleFile}/>
                                        <button
                                            type="submit"
                                            className="select-none ml-2 font-phenomenaBold float-right py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-success hover:bg-green-600"
                                        >
                                            DOSYAYI YÜKLE
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
                            title="Dosya Yükleme İsteğiniz İşleniyor..."
                        />

                        <SuccessNotification
                            isOpen={isOpenSuccessSaveNotification}
                            closeNotification={closeSuccessSaveNotification}
                            title="Dosya Yükleme İşlemi Başarılı!"
                            description="Dosya Yükleme İşlemi başarıyla gerçekleşti.
                            Mesaj penceresini kapattıktan sonra dosya listeleme
                            ekranına yönlendirileceksiniz."
                        />

                        <FailNotification
                            isOpen={isOpenFailSaveNotification}
                            closeNotification={closeFailSaveNotification}
                            title="Dosya Yükleme İşlemi Başarısız!"
                            description="Lütfen bölüm seçiminizi kontrol ediniz.
                            Bölüm seçtiyseniz; bu bölüme ait sınav programı sistemde mevcut olabilir,
                            tanımlı olan dosyayı sildikten sonra tekrar deneyerek sınav programı ekleyebilirsiniz
                            veya sistemsel bir hatadan dolayı isteğiniz sonuçlandıralamamış olabilir,
                            dosyayı yükleyerek yeniden deneyebilirsiniz."
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}
