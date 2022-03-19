import {useState} from "react";
import {useRouter} from "next/router";
import SISTitle from "../../../../../../../public/components/page-titles";
import OfficerNavbar from "../../../../../../../public/components/navbar/officer/officer-navbar";
import SisOfficerStorage from "../../../../../../../public/storage/officer/SisOfficerStorage";
import UnauthorizedAccessPage from "../../../../../../401";
import SuccessNotification from "../../../../../../../public/notifications/success";
import FailNotification from "../../../../../../../public/notifications/fail";
import ProcessNotification from "../../../../../../../public/notifications/process";
import ExamScheduleFileController from "../../../../../../../public/api/exam-file/ExamScheduleFileController";

export async function getServerSideProps(context) {
    const officerId = SisOfficerStorage.getNumberWithContext(context);
    if (officerId === undefined) {
        return {
            props: {
                isPagePermissionSuccess: false
            }
        }
    }

    const {id} = context.query;
    const examScheduleFileData = await ExamScheduleFileController.getExamScheduleFileDetailByExamScheduleFileId(id);
    if (examScheduleFileData.success) {
        return {
            props: {
                isPagePermissionSuccess: true,
                examScheduleFile: examScheduleFileData.response
            }
        }
    }
}

export default function ExamScheduleFileDetail({isPagePermissionSuccess, examScheduleFile}) {

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

        const examScheduleFileData = await ExamScheduleFileController.deleteExamScheduleFile(examScheduleFile.departmentResponse.departmentId);
        if (examScheduleFileData.success) {
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
                <div className="max-w-7xl select-none py-5 mx-auto space-y-6">
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
