import {useState} from "react";
import {useRouter} from "next/router";
import SISTitle from "../../../../../../../public/components/page-titles";
import OfficerNavbar from "../../../../../../../public/components/navbar/officer/officer-navbar";
import {getOfficerNumberWithContext} from "../../../../../../../public/storage/officer";
import UnauthorizedAccessPage from "../../../../../../401";
import SuccessNotification from "../../../../../../../public/notifications/success";
import FailNotification from "../../../../../../../public/notifications/fail";
import ProcessNotification from "../../../../../../../public/notifications/process";

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
    const examScheduleFileResponse = await fetch(`${SIS_API_URL}/exam-schedule-file/department/` + id, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    const examScheduleFileData = await examScheduleFileResponse.json();
    if (examScheduleFileData.success) {
        return {
            props: {
                isPagePermissionSuccess: true,
                SIS_API_URL: SIS_API_URL,
                examScheduleFile: examScheduleFileData.response
            }
        }
    }
}

export default function ExamScheduleFileDetail({isPagePermissionSuccess, SIS_API_URL, examScheduleFile}) {

    if (!isPagePermissionSuccess) {
        return (
            <UnauthorizedAccessPage user="officer"/>
        )
    }

    const router = useRouter();

    let [isOpenProcessingDeleteNotification, setIsOpenProcessingDeleteNotification] = useState(false);

    function closeProcessingDeleteNotification() {
        setIsOpenProcessingDeleteNotification(false);
        router.push("/officer/operation/schedule/exam/files").then(r => router.reload());
    }

    function openProcessingDeleteNotification() {
        setIsOpenProcessingDeleteNotification(true);
    }

    let [isOpenSuccessDeleteNotification, setIsOpenSuccessDeleteNotification] = useState(false);

    function closeSuccessDeleteNotification() {
        setIsOpenSuccessDeleteNotification(false);
        router.reload();
    }

    function openSuccessDeleteNotification() {
        setIsOpenSuccessDeleteNotification(true);
    }

    let [isOpenFailDeleteNotification, setIsOpenFailDeleteNotification] = useState(false);

    function closeFailDeleteNotification() {
        setIsOpenFailDeleteNotification(false);
    }

    function openFailDeleteNotification() {
        setIsOpenFailDeleteNotification(true);
    }

    const examScheduleFileDelete = async (event) => {
        openProcessingDeleteNotification();

        event.preventDefault();

        const deleteRes = await fetch(`${SIS_API_URL}/exam-schedule-file/delete/department/` + examScheduleFile.departmentResponse.departmentId, {
            headers: {'Content-Type': 'application/json'},
            method: 'DELETE'
        });
        const deleteData = await deleteRes.json();
        if (deleteData.success) {
            closeProcessingDeleteNotification();
            openSuccessDeleteNotification();
        } else {
            closeProcessingDeleteNotification();
            openFailDeleteNotification();
        }
    }

    return (
        <div>
            <SISTitle/>
            <OfficerNavbar/>
            <div className="mt-5 md:mt-0 md:col-span-2">
                <div className="px-28 py-5 mx-auto space-y-6">
                    <div className="max-w-7xl mx-auto h-52 px-12 py-10 text-center bg-gray-50 rounded-2xl shadow-xl">
                        <a className="select-none font-phenomenaExtraBold text-4xl text-sis-darkblue">
                            {examScheduleFile.departmentResponse.name} Sınav Programı
                        </a>
                        <div className="mt-10 content-center">
                            <div>
                                <a
                                    href={examScheduleFile.fileViewUrl}
                                    className="select-none font-phenomenaBold py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-success hover:bg-green-600"
                                >
                                    DOSYAYI GÖRÜNTÜLE
                                </a>
                                <a
                                    href={examScheduleFile.fileDownloadUrl}
                                    className="select-none ml-2 font-phenomenaBold py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-success hover:bg-green-600"
                                >
                                    DOSYAYI İNDİR
                                </a>
                                <button
                                    onClick={examScheduleFileDelete}
                                    type="submit"
                                    className="select-none ml-2 font-phenomenaBold py-1.5 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-fail hover:bg-red-700"
                                >
                                    DOSYAYI SİL
                                </button>
                            </div>
                        </div>
                    </div>
                    <form className="px-4 py-5 max-w-4xl mx-auto space-y-6">
                        <div className="shadow overflow-hidden sm:rounded-md">

                            <ProcessNotification
                                isOpen={isOpenProcessingDeleteNotification}
                                closeNotification={closeSuccessDeleteNotification}
                                title="Dosya Silme İsteğiniz İşleniyor..."
                            />

                            <SuccessNotification
                                isOpen={isOpenSuccessDeleteNotification}
                                closeNotification={closeSuccessDeleteNotification}
                                title="Dosya Silme İşlemi Başarılı!"
                                description="Dosya Silme İşlemi başarıyla gerçekleşti.
                                    Mesaj penceresini kapattıktan sonra sınav programlarının
                                    listelendiği ekrana yönlendirileceksiniz."
                            />

                            <FailNotification
                                isOpen={isOpenFailDeleteNotification}
                                closeNotification={closeFailDeleteNotification}
                                title="Dosya Silme İşlemi Başarısız!"
                                description="Sistemsel bir hatadan dolayı
                                    isteğiniz sonuçlandıralamamış olabilir,
                                    dosyayı silmeyi yeniden deneyebilirsiniz."
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
