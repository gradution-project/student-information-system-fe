import SISTitle from "../../../../../public/components/page-titles";
import OfficerNavbar from "../../../../../public/components/navbar/officer/officer-navbar";
import {useRouter} from "next/router";
import {useState} from "react";
import DepartmentStatus from "../../../../../public/constants/department/DepartmentStatus";
import UnauthorizedAccessPage from "../../../../401";
import SisOfficerStorage from "../../../../../public/storage/officer/SisOfficerStorage";
import ProcessNotification from "../../../../../public/notifications/process";
import SuccessNotification from "../../../../../public/notifications/success";
import FailNotification from "../../../../../public/notifications/fail";
import FacultyController from "../../../../../public/api/faculty/FacultyController";
import DepartmentController from "../../../../../public/api/department/DepartmentController";
import DepartmentPreparatoryClass from "../../../../../public/constants/department/DepartmentPreparatoryClass";
import SisOperationButton from "../../../../../public/components/buttons/SisOperationButton";

export async function getServerSideProps(context) {
    const officerId = SisOfficerStorage.getNumberWithContext(context);
    if (officerId === undefined) {
        return {
            props: {
                isPagePermissionSuccess: false
            }
        }
    }

    const facultiesData = await FacultyController.getAllFacultiesByStatus(DepartmentStatus.ACTIVE);
    if (facultiesData.success) {
        return {
            props: {
                isPagePermissionSuccess: true,
                operationUserId: officerId,
                faculties: facultiesData.response
            }
        }
    }
}


export default function DepartmentSave({isPagePermissionSuccess, operationUserId, faculties}) {

    if (!isPagePermissionSuccess) {
        return (
            <UnauthorizedAccessPage user="officer"/>
        )
    }

    const router = useRouter();

    let [isOpenSuccessSaveNotification, setIsOpenSuccessSaveNotification] = useState(false);

    function closeSuccessSaveNotification() {
        setIsOpenSuccessSaveNotification(false);
        router.push("/officer/operation/department").then(() => router.reload());
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


    const [facultyId, setFacultyId] = useState();
    const changeFacultyId = event => {
        const facultyId = event.target.value;
        setFacultyId(facultyId);
    }

    const [departmentName, setDepartmentName] = useState();
    const changeDepartmentName = event => {
        const departmentName = event.target.value;
        setDepartmentName(departmentName);
    }

    const [departmentPreparatoryClass, setDepartmentPreparatoryClass] = useState();
    const changePreparatoryClass = event => {
        const departmentPreparatoryClass = event.target.value;
        setDepartmentPreparatoryClass(departmentPreparatoryClass);
    }

    const [departmentTotalClassLevel, setDepartmentTotalClassLevel] = useState();
    const changeTotalClassLevel = event => {
        const departmentTotalClassLevel = event.target.value;
        setDepartmentTotalClassLevel(departmentTotalClassLevel);
    }

    const departmentSave = async (event) => {
        openProcessingSaveNotification();

        event.preventDefault();

        const departmentData = await DepartmentController.saveDepartment(operationUserId, facultyId,
            departmentPreparatoryClass, departmentName, departmentTotalClassLevel);

        if (departmentData.success) {
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
            <div className="select-none mt-10 py-4 sm:mt-0">
                <form className="mt-5 px-4 max-w-3xl mx-auto space-y-6" onSubmit={departmentSave}>
                    <div className="shadow sm:rounded-md sm:overflow-hidden">
                        <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                            <div className="mb-6 px-4 sm:px-0 bg-gray-50 rounded-xl">
                                <h3 className="py-8 font-phenomenaExtraBold leading-6 text-sis-darkblue text-center text-3xl">
                                    B??L??M EKLEME
                                </h3>
                            </div>
                            <div className="grid grid-cols-6 gap-6">

                                <div className="sm:col-span-3">
                                    <label htmlFor="facultyId"
                                           className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                        FAK??LTE ADI
                                    </label>
                                    <select
                                        onChange={changeFacultyId}
                                        id="facultyId"
                                        name="facultyId"
                                        autoComplete="facultyId"
                                        className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                    >
                                        <option>Fak??lte Se??iniz...</option>
                                        {faculties.map((faculty) => (
                                            <option key={faculty.facultyId}
                                                    value={faculty.facultyId}>{faculty.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="department-name"
                                           className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                        B??L??M ADI
                                    </label>
                                    <input
                                        onChange={changeDepartmentName}
                                        type="text"
                                        name="name"
                                        id="name"
                                        autoComplete="department-name"
                                        className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="totalClassLevel"
                                           className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                        SINIF SAYISI
                                    </label>
                                    <input
                                        onChange={changeTotalClassLevel}
                                        type="text"
                                        name="totalClassLevel"
                                        id="totalClassLevel"
                                        autoComplete="totalClassLevel"
                                        className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                    />
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="isTherePreparatoryLevel"
                                           className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                        HAZIRLIK SINIFI
                                    </label>
                                    <select
                                        onChange={changePreparatoryClass}
                                        id="isTherePreparatoryLevel"
                                        name="isTherePreparatoryLevel"
                                        autoComplete="isTherePreparatoryLevel"
                                        className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                    >
                                        <option>Haz??rl??k S??n??f?? Durumu Se??iniz...</option>
                                        {DepartmentPreparatoryClass.getAll.map(preparatoryClass => (
                                            <option key={preparatoryClass.value}
                                                    value={preparatoryClass.value}>{preparatoryClass.tr}</option>
                                        ))}
                                    </select>
                                </div>

                            </div>
                        </div>
                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                            {SisOperationButton.getSaveButton("KAYDET")}
                        </div>

                        <ProcessNotification
                            isOpen={isOpenProcessingSaveNotification}
                            closeNotification={closeProcessingSaveNotification}
                            title="B??l??m Ekleme ??ste??iniz ????leniyor..."
                        />

                        <SuccessNotification
                            isOpen={isOpenSuccessSaveNotification}
                            closeNotification={closeSuccessSaveNotification}
                            title="B??l??m Ekleme ????lemi Ba??ar??l??!"
                            description="B??l??m Ekleme ????lemi ba??ar??yla ger??ekle??ti.
                            Mesaj penceresini kapatt??ktan sonra b??l??m listeleme ekran??na y??nlendirileceksiniz."
                        />

                        <FailNotification
                            isOpen={isOpenFailSaveNotification}
                            closeNotification={closeFailSaveNotification}
                            title="B??l??m Ekleme ????lemi Ba??ar??s??z!"
                            description="L??tfen girdi??iniz verileri kontrol ediniz.
                            Verilerinizi do??ru girdiyseniz
                            sistemsel bir hatadan dolay?? iste??iniz sonu??land??ralamam???? olabilir."
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}