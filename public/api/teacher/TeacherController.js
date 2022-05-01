
const SIS_API_URL = process.env.NEXT_PUBLIC_SIS_API_URL;

const getAllTeachersByStatus = async (status) => {
    const apiResult = await fetch(`${SIS_API_URL}/teacher?status=${status}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    return await apiResult.json();
};

const getTeacherDetailByTeacherId = async (teacherId) => {
    const apiResult = await fetch(`${SIS_API_URL}/teacher/${teacherId}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    return await apiResult.json();
};

const saveTeacher = async (operationUserId, academicInfo, personalInfo) => {

    const apiResult = await fetch(`${SIS_API_URL}/teacher/save`, {
        body: JSON.stringify({
            operationInfoRequest: {
                userId: operationUserId
            },
            academicInfoRequest: {
                degree: academicInfo.degree,
                departmentId: academicInfo.departmentId,
                fieldOfStudy: academicInfo.fieldOfStudy,
                phoneNumber: academicInfo.phoneNumber,
                role: academicInfo.role
            },
            personalInfoRequest: {
                address: personalInfo.address,
                birthday: personalInfo.birthday,
                email: personalInfo.email,
                name: personalInfo.name,
                phoneNumber: personalInfo.phoneNumber,
                surname: personalInfo.surname,
                tcNo: personalInfo.tcNo
            }
        }),
        headers: {'Content-Type': 'application/json'},
        method: 'POST'
    });
    return await apiResult.json();
};

const updateTeacherAcademicInfo = async (operationUserId, teacherId, academicInfo) => {

    const apiResult = await fetch(`${SIS_API_URL}/teacher/update/academic-info/${teacherId}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'PUT',
        body: JSON.stringify({
            operationInfoRequest: {
                userId: operationUserId
            },
            academicInfoRequest: {
                departmentId: academicInfo.departmentId,
                degree: academicInfo.degree,
                fieldOfStudy: academicInfo.fieldOfStudy,
                phoneNumber: academicInfo.phoneNumber,
                role: academicInfo.role
            }
        }),
    });
    return await apiResult.json();
};

const updateTeacherPersonalInfo = async (operationUserId, teacherId, personalInfo) => {

    const apiResult = await fetch(`${SIS_API_URL}/teacher/update/personal-info/${teacherId}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'PUT',
        body: JSON.stringify({
            operationInfoRequest: {
                userId: operationUserId
            },
            personalInfoRequest: {
                address: personalInfo.address,
                birthday: personalInfo.birthday,
                email: personalInfo.email,
                name: personalInfo.name,
                phoneNumber: personalInfo.phoneNumber,
                surname: personalInfo.surname,
                tcNo:personalInfo.tcNo
            }
        }),
    });
    return await apiResult.json();
};

const activateTeacher = async (operationUserId, teacherId) => {

    const apiResult = await fetch(`${SIS_API_URL}/teacher/activate`, {
        headers: {'Content-Type': 'application/json'},
        method: 'PATCH',
        body: JSON.stringify({
            operationInfoRequest: {
                userId: operationUserId
            },
            teacherId: teacherId
        }),
    });
    return await apiResult.json();
};

const passivateTeacher = async (operationUserId, teacherId) => {

    const apiResult = await fetch(`${SIS_API_URL}/teacher/passivate`, {
        headers: {'Content-Type': 'application/json'},
        method: 'PATCH',
        body: JSON.stringify({
            operationInfoRequest: {
                userId: operationUserId
            },
            teacherId: teacherId
        }),
    });
    return await apiResult.json();
};

const deleteTeacher = async (operationUserId, teacherId) => {

    const apiResult = await fetch(`${SIS_API_URL}/teacher/delete`, {
        headers: {'Content-Type': 'application/json'},
        method: 'DELETE',
        body: JSON.stringify({
            operationInfoRequest: {
                userId: operationUserId
            },
            teacherId: teacherId
        }),
    });
    return await apiResult.json();
};


const TeacherController = {
    getAllTeachersByStatus,
    getTeacherDetailByTeacherId,
    saveTeacher,
    updateTeacherAcademicInfo,
    updateTeacherPersonalInfo,
    activateTeacher,
    passivateTeacher,
    deleteTeacher
};

export default TeacherController;