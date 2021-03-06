import SISTitle from "../../../../../../../public/components/page-titles";
import OfficerNavbar from "../../../../../../../public/components/navbar/officer/officer-navbar";
import {useState} from "react";
import {useRouter} from "next/router";
import SisOfficerStorage from "../../../../../../../public/storage/officer/SisOfficerStorage";
import UnauthorizedAccessPage from "../../../../../../401";
import ProcessNotification from "../../../../../../../public/notifications/process";
import SuccessNotification from "../../../../../../../public/notifications/success";
import FailNotification from "../../../../../../../public/notifications/fail";
import FacultyController from "../../../../../../../public/api/faculty/FacultyController";
import FacultyStatus from "../../../../../../../public/constants/faculty/FacultyStatus";
import SisOperationButton from "../../../../../../../public/components/buttons/SisOperationButton";
import PageNotFound from "../../../../../../404";

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
    const facultyData = await FacultyController.getFacultyByFacultyId(id);
    if (facultyData.success) {
        return {
            props: {
                isPagePermissionSuccess: true,
                isDataFound: true,
                operationUserId: officerId,
                faculty: facultyData.response
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


export default function FacultyDetail({isPagePermissionSuccess, isDataFound, operationUserId, faculty}) {

    if (!isPagePermissionSuccess) {
        return (
            <UnauthorizedAccessPage user="/officer"/>
        )
    }

    if (!isDataFound) {
        return (
            <PageNotFound user="/officer"/>
        )
    }

    const router = useRouter();

    let [isOpenProcessingActivateNotification, setIsOpenProcessingActivateNotification] = useState(false);

    function closeProcessingActivateNotification() {
        setIsOpenProcessingActivateNotification(false);
    }

    function openProcessingActivateNotification() {
        setIsOpenProcessingActivateNotification(true);
    }

    let [isOpenSuccessActivateNotification, setIsOpenSuccessActivateNotification] = useState(false);

    function closeSuccessActivateNotification() {
        setIsOpenSuccessActivateNotification(false);
        router.reload();
    }

    function openSuccessActivateNotification() {
        setIsOpenSuccessActivateNotification(true);
    }

    let [isOpenFailActivateNotification, setIsOpenFailActivateNotification] = useState(false);

    function closeFailActivateNotification() {
        setIsOpenFailActivateNotification(false);
    }

    function openFailActivateNotification() {
        setIsOpenFailActivateNotification(true);
    }

    const facultyActivate = async (event) => {
        openProcessingActivateNotification();

        event.preventDefault();

        const facultyData = await FacultyController.activateFaculty(operationUserId, faculty.facultyId);
        if (facultyData.success) {
            closeProcessingActivateNotification();
            openSuccessActivateNotification()
        } else {
            closeProcessingActivateNotification();
            openFailActivateNotification();
        }
    }


    let [isOpenProcessingPassivateNotification, setIsOpenProcessingPassivateNotification] = useState(false);

    function closeProcessingPassivateNotification() {
        setIsOpenProcessingPassivateNotification(false);
    }

    function openProcessingPassivateNotification() {
        setIsOpenProcessingPassivateNotification(true);
    }

    let [isOpenSuccessPassivateNotification, setIsOpenSuccessPassivateNotification] = useState(false);

    function closeSuccessPassivateNotification() {
        setIsOpenSuccessPassivateNotification(false);
        router.reload();
    }

    function openSuccessPassivateNotification() {
        setIsOpenSuccessPassivateNotification(true);
    }

    let [isOpenFailPassivateNotification, setIsOpenFailPassivateNotification] = useState(false);

    function closeFailPassivateNotification() {
        setIsOpenFailPassivateNotification(false);
    }

    function openFailPassivateNotification() {
        setIsOpenFailPassivateNotification(true);
    }

    const facultyPassivate = async (event) => {
        openProcessingPassivateNotification();

        event.preventDefault();

        const facultyData = await FacultyController.passivateFaculty(operationUserId, faculty.facultyId);
        if (facultyData.success) {
            closeProcessingPassivateNotification();
            openSuccessPassivateNotification();
        } else {
            closeProcessingPassivateNotification();
            openFailPassivateNotification();
        }
    }


    let [isOpenProcessingDeleteNotification, setIsOpenProcessingDeleteNotification] = useState(false);

    function closeProcessingDeleteNotification() {
        setIsOpenProcessingDeleteNotification(false);
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

    const facultyDelete = async (event) => {
        openProcessingDeleteNotification();

        event.preventDefault();

        const facultyData = await FacultyController.deleteFaculty(operationUserId, faculty.facultyId);
        if (facultyData.success) {
            closeProcessingDeleteNotification();
            openSuccessDeleteNotification()
        } else {
            closeProcessingDeleteNotification();
            openFailDeleteNotification();
        }
    }


    let [isOpenProcessingUpdateNotification, setIsOpenProcessingUpdateNotification] = useState(false);

    function closeProcessingUpdateNotification() {
        setIsOpenProcessingUpdateNotification(false);
    }

    function openProcessingUpdateNotification() {
        setIsOpenProcessingUpdateNotification(true);
    }

    let [isOpenSuccessUpdateNotification, setIsOpenSuccessUpdateNotification] = useState(false);

    function closeSuccessUpdateNotification() {
        setIsOpenSuccessUpdateNotification(false);
        router.reload();
    }

    function openSuccessUpdateNotification() {
        setIsOpenSuccessUpdateNotification(true);
    }

    let [isOpenFailUpdateNotification, setIsOpenFailUpdateNotification] = useState(false);

    function closeFailUpdateNotification() {
        setIsOpenFailUpdateNotification(false);
    }

    function openFailUpdateNotification() {
        setIsOpenFailUpdateNotification(true);
    }

    const [facultyName, setFacultyName] = useState(faculty.name);
    const changeFacultyName = event => {
        setFacultyName(event.target.value.toLocaleUpperCase('tr-TR'));
    }

    const facultyUpdate = async (event) => {
        openProcessingUpdateNotification();

        event.preventDefault();

        const facultyData = await FacultyController.updateFaculty(operationUserId, faculty, facultyName);
        if (facultyData.success) {
            closeProcessingUpdateNotification();
            openSuccessUpdateNotification();
        } else {
            closeProcessingUpdateNotification();
            openFailUpdateNotification();
        }
    }

    const isFacultyPassiveOrDeleted = () => {
        return faculty.status === FacultyStatus.PASSIVE || faculty.status === FacultyStatus.DELETED
    }

    return (
        <>
            <div>
                <SISTitle/>
                <OfficerNavbar/>
                <div className="max-w-7xl select-none py-5 mx-auto space-y-6">
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <div className="px-12 py-10 text-left bg-gray-50 rounded-2xl shadow-xl">
                            <a className="select-none font-phenomenaExtraBold text-left text-4xl text-sis-darkblue">
                                {faculty.name}
                            </a>
                            {FacultyStatus.getAll.map((facultyStatus) => (
                                faculty.status === facultyStatus.enum
                                    ?
                                    facultyStatus.component
                                    :
                                    null
                            ))}
                            {(
                                faculty.status === FacultyStatus.DELETED
                                    ?
                                    null
                                    :
                                    SisOperationButton.getDeleteButton({facultyDelete}, "FAK??LTEY?? S??L")
                            )}
                            {(
                                faculty.status === FacultyStatus.PASSIVE || faculty.status === FacultyStatus.DELETED
                                    ?
                                    null
                                    :
                                    SisOperationButton.getPassivateButton({facultyPassivate}, "FAK??LTEY?? PAS??FLE??T??R")
                            )}
                            {(
                                faculty.status === FacultyStatus.ACTIVE || faculty.status === FacultyStatus.DELETED
                                    ?
                                    null
                                    :
                                    SisOperationButton.getActivateButton({facultyActivate}, "FAK??LTEY?? AKT??FLE??T??R")
                            )}
                        </div>
                        <div className="select-none mt-10 py-4 sm:mt-0">
                            <form className="mt-5 px-4 max-w-3xl mx-auto space-y-6">
                                <div className="shadow sm:rounded-md sm:overflow-hidden">
                                    <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                                        <div className="mb-6 px-4 sm:px-0 bg-gray-50 rounded-xl">
                                            <h3 className="py-8 font-phenomenaExtraBold leading-6 text-sis-darkblue text-center text-3xl">
                                                FAK??LTE B??LG??LER??
                                            </h3>
                                        </div>
                                        <div className="grid grid-cols-6 gap-6">
                                            <div className="sm:col-span-3">
                                                <label htmlFor="faculty-number"
                                                       className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                    FAK??LTE NUMARASI
                                                </label>
                                                <input
                                                    type="text"
                                                    name="facultyId"
                                                    id="facultyId"
                                                    defaultValue={faculty.facultyId}
                                                    disabled
                                                    className="font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="name"
                                                       className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                    ADI
                                                </label>
                                                <input
                                                    onChange={changeFacultyName}
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    defaultValue={faculty.name}
                                                    disabled={isFacultyPassiveOrDeleted()}
                                                    className={isFacultyPassiveOrDeleted()
                                                        ? "font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                        : "font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                    }/>
                                            </div>

                                            {(
                                                faculty.modifiedDate !== null
                                                    ?
                                                    <div className="sm:col-span-6">
                                                        <a className="font-phenomenaRegular text-sis-blue text-xl">
                                                            Son D??zenlenme Tarihi : {faculty.modifiedDate}
                                                        </a>
                                                    </div>
                                                    :
                                                    null
                                            )}
                                        </div>
                                    </div>

                                    {(
                                        isFacultyPassiveOrDeleted()
                                            ?
                                            null
                                            :
                                            SisOperationButton.getUpdateButton(facultyUpdate, "G??NCELLE")
                                    )}

                                    {/**
                                     * Activate
                                     */}
                                    <ProcessNotification
                                        isOpen={isOpenProcessingActivateNotification}
                                        closeNotification={closeProcessingActivateNotification}
                                        title="Fak??lte Aktifle??tirme ??ste??iniz ????leniyor..."
                                    />

                                    <SuccessNotification
                                        isOpen={isOpenSuccessActivateNotification}
                                        closeNotification={closeSuccessActivateNotification}
                                        title="Fak??lte Aktifle??time ????lemi Ba??ar??l??!"
                                        description="Fak??lte Aktifle??tirildi."
                                    />

                                    <FailNotification
                                        isOpen={isOpenFailActivateNotification}
                                        closeNotification={closeFailActivateNotification}
                                        title="Fak??lte Aktifle??tirme ????lemi Ba??ar??s??z!"
                                        description="Sistemsel bir hatadan dolay?? iste??iniz sonu??land??ralamam???? olabilir."
                                    />

                                    {/**
                                     * Passivate
                                     */}
                                    <ProcessNotification
                                        isOpen={isOpenProcessingPassivateNotification}
                                        closeNotification={closeProcessingPassivateNotification}
                                        title="Fak??lte Pasifle??tirme ??ste??iniz ????leniyor..."
                                    />

                                    <SuccessNotification
                                        isOpen={isOpenSuccessPassivateNotification}
                                        closeNotification={closeSuccessPassivateNotification}
                                        title="Fak??lte Pasifle??tirme ????lemi Ba??ar??l??!"
                                        description="Fak??lte Pasifle??tirildi."
                                    />

                                    <FailNotification
                                        isOpen={isOpenFailPassivateNotification}
                                        closeNotification={closeFailPassivateNotification}
                                        title="Fak??lte Pasifle??tirme ????lemi Ba??ar??s??z!"
                                        description="Sistemsel bir hatadan dolay?? iste??iniz sonu??land??ralamam???? olabilir."
                                    />

                                    {/**
                                     * Delete
                                     */}
                                    <ProcessNotification
                                        isOpen={isOpenProcessingDeleteNotification}
                                        closeNotification={closeProcessingDeleteNotification}
                                        title="Fak??lte Silme ??ste??iniz ????leniyor..."
                                    />

                                    <SuccessNotification
                                        isOpen={isOpenSuccessDeleteNotification}
                                        closeNotification={closeSuccessDeleteNotification}
                                        title="Fak??lte Sime ????lemi Ba??ar??l??!"
                                        description="Fak??lte Silindi."
                                    />

                                    <FailNotification
                                        isOpen={isOpenFailDeleteNotification}
                                        closeNotification={closeFailDeleteNotification}
                                        title="Fak??lte Silme ????lemi Ba??ar??s??z!"
                                        description="Sistemsel bir hatadan dolay?? iste??iniz sonu??land??ralamam???? olabilir."
                                    />

                                    {/**
                                     * Update
                                     */}
                                    <ProcessNotification
                                        isOpen={isOpenProcessingUpdateNotification}
                                        closeNotification={closeProcessingUpdateNotification}
                                        title="Fak??lte Bilgi G??ncelleme ??ste??iniz ????leniyor..."
                                    />

                                    <SuccessNotification
                                        isOpen={isOpenSuccessUpdateNotification}
                                        closeNotification={closeSuccessUpdateNotification}
                                        title="Fak??lte Bilgi G??ncelleme ????lemi Ba??ar??l??!"
                                        description="Fak??lte Bilgi G??ncelleme ????lemi ba??ar??yla ger??ekle??ti."
                                    />

                                    <FailNotification
                                        isOpen={isOpenFailUpdateNotification}
                                        closeNotification={closeFailUpdateNotification}
                                        title="Fak??lte Bilgi G??ncelleme ????lemi Ba??ar??s??z!"
                                        description="L??tfen girdi??iniz verileri kontrol ediniz.
                                    Verilerinizi do??ru girdiyseniz
                                    sistemsel bir hatadan dolay?? iste??iniz sonu??land??ralamam???? olabilir."
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}