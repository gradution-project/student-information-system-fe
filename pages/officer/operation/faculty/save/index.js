import SISTitle from "../../../../../public/components/page-titles";
import OfficerNavbar from "../../../../../public/components/navbar/officer/officer-navbar";
import {useState} from "react";
import {useRouter} from "next/router";
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
    return {
        props: {
            isPagePermissionSuccess: true,
            operationUserId: officerId,
            SIS_API_URL: SIS_API_URL
        }
    }
}

export default function FacultySave({isPagePermissionSuccess, operationUserId, SIS_API_URL}) {

    if (!isPagePermissionSuccess) {
        return (
            <UnauthorizedAccessPage user="officer"/>
        )
    }

    const router = useRouter();

    const [facultyName, setFacultyName] = useState();
    const changeFacultyName = event => {
        const facultyName = event.target.value;
        setFacultyName(facultyName);
    }

    let [isOpenSuccessNotification, setIsOpenSuccessNotification] = useState(false);

    function closeSuccessNotification() {
        setIsOpenSuccessNotification(false);
        router.push("/officer/operation/faculty").then(() => router.reload());
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

    let [isOpenProcessingNotification, setIsOpenProcessingNotification] = useState(false);

    function closeProcessingNotification() {
        setIsOpenProcessingNotification(false);
    }

    function openProcessingNotification() {
        setIsOpenProcessingNotification(true);
    }

    const facultySave = async (event) => {

        openProcessingNotification();

        event.preventDefault();

        const saveRes = await fetch(`${SIS_API_URL}/faculty/save`, {
            body: JSON.stringify({
                facultyInfoRequest: {
                    name: facultyName
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
            closeProcessingNotification();
            openSuccessNotification()
        } else {
            closeProcessingNotification();
            openFailNotification();
        }
    }

    return (
        <div>
            <SISTitle/>
            <OfficerNavbar/>
            <div className="select-none md:col-span-1">
                <form className="mt-5 px-4 max-w-3xl mx-auto space-y-6" onSubmit={facultySave}>
                    <div className="shadow sm:rounded-md sm:overflow-hidden">
                        <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                            <div className="mb-6 px-4 sm:px-0 bg-gray-50 rounded-xl">
                                <h3 className="py-8 font-phenomenaExtraBold leading-6 text-sis-darkblue text-center text-3xl">
                                    FAKÜLTE EKLEME
                                </h3>
                            </div>
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-6">
                                    <label htmlFor="faculty-name"
                                           className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                        FAKÜLTE ADI
                                    </label>
                                    <input
                                        onChange={changeFacultyName}
                                        type="text"
                                        name="name"
                                        id="name"
                                        autoComplete="faculty-name"
                                        className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                    />
                                </div>


                            </div>
                        </div>
                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <button
                                type="submit"
                                className=" font-phenomenaBold inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-yellow hover:bg-sis-darkblue"
                            >
                                KAYDET
                            </button>
                        </div>

                        <ProcessNotification
                            isOpen={isOpenProcessingNotification}
                            closeNotification={closeProcessingNotification}
                            title="Bölüm Ekleme İsteğiniz İşleniyor..."
                        />

                        <SuccessNotification
                            isOpen={isOpenSuccessNotification}
                            closeNotification={closeSuccessNotification}
                            title="Bölüm Ekleme İşlemi Başarılı!"
                            description="Bölüm Ekleme İşlemi başarıyla gerçekleşti.
                            Mesaj penceresini kapattıktan sonra bölüm listeleme ekranına yönlendirileceksiniz."
                        />

                        <FailNotification
                            isOpen={isOpenFailNotification}
                            closeNotification={closeFailNotification}
                            title="Bölüm Ekleme İşlemi Başarısız!"
                            description="Lütfen girdiğiniz verileri kontrol ediniz.
                            Verilerinizi doğru girdiyseniz
                            sistemsel bir hatadan dolayı isteğiniz sonuçlandıralamamış olabilir."
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}