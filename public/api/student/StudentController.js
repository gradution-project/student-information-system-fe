
const SIS_API_URL = process.env.NEXT_PUBLIC_SIS_API_URL;

const getAllStudentsByStatus = async (status) => {
    const apiResult = await fetch(`${SIS_API_URL}/student?status=${status}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    return await apiResult.json();
};

const getStudentDetailByStudentId = async (studentId) => {
    const apiResult = await fetch(`${SIS_API_URL}/student/${studentId}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    return await apiResult.json();
};

const saveStudent = async (operationUserId, academicInfo, personalInfo) => {

    const apiResult = await fetch(`${SIS_API_URL}/student/save`, {
        body: JSON.stringify({
            operationInfoRequest: {
                userId: operationUserId
            },
            academicInfoRequest: {
                degree: academicInfo.degree,
                departmentId: academicInfo.departmentId,
                classLevel: academicInfo.classLevel,
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

const updateStudentAcademicInfo = async (operationUserId, studentId, academicInfo) => {

    const apiResult = await fetch(`${SIS_API_URL}/student/update/academic-info/${studentId}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'PUT',
        body: JSON.stringify({
            operationInfoRequest: {
                userId: operationUserId
            },
            academicInfoRequest: {
                classLevel: academicInfo.classLevel,
                degree: academicInfo.degree,
                departmentId: academicInfo.departmentId
            }
        }),
    });
    return await apiResult.json();
};

const updateStudentPersonalInfo = async (operationUserId, studentId, personalInfo) => {

    const apiResult = await fetch(`${SIS_API_URL}/student/update/personal-info/${studentId}`, {
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

const activateStudent = async (operationUserId, studentId) => {

    const apiResult = await fetch(`${SIS_API_URL}/student/activate`, {
        headers: {'Content-Type': 'application/json'},
        method: 'PATCH',
        body: JSON.stringify({
            operationInfoRequest: {
                userId: operationUserId
            },
            studentId: studentId
        }),
    });
    return await apiResult.json();
};

const passivateStudent = async (operationUserId, studentId) => {

    const apiResult = await fetch(`${SIS_API_URL}/student/passivate`, {
        headers: {'Content-Type': 'application/json'},
        method: 'PATCH',
        body: JSON.stringify({
            operationInfoRequest: {
                userId: operationUserId
            },
            studentId: studentId
        }),
    });
    return await apiResult.json();
};

const deleteStudent = async (operationUserId, studentId) => {

    const apiResult = await fetch(`${SIS_API_URL}/student/delete`, {
        headers: {'Content-Type': 'application/json'},
        method: 'DELETE',
        body: JSON.stringify({
            operationInfoRequest: {
                userId: operationUserId
            },
            studentId: studentId
        }),
    });
    return await apiResult.json();
};

const graduateStudent = async (operationUserId, studentId) => {

    const apiResult = await fetch(`${SIS_API_URL}/student/graduation/save`, {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({
        operationInfoRequest: {
            feUrl: "",
            userId: operationUserId
         },
            studentId: studentId

        }),
    });
    return await apiResult.json();
};

const getAllStudentGraduationsByStatus = async (status) => {
    const apiResult = await fetch(`${SIS_API_URL}/student/graduation/get?status=${status}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    return await apiResult.json();
};

const StudentController = {
    getAllStudentsByStatus,
    getStudentDetailByStudentId,
    saveStudent,
    updateStudentAcademicInfo,
    updateStudentPersonalInfo,
    activateStudent,
    passivateStudent,
    deleteStudent,
    graduateStudent,
    getAllStudentGraduationsByStatus
};

export default StudentController;