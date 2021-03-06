
const SIS_API_URL = process.env.NEXT_PUBLIC_SIS_API_URL;

const getAllStudentsByStatus = async (status) => {
    const apiResult = await fetch(`${SIS_API_URL}/students?status=${status}`, {
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

    const apiResult = await fetch(`${SIS_API_URL}/student`, {
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

    const apiResult = await fetch(`${SIS_API_URL}/student/academic/info/${studentId}`, {
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

    const apiResult = await fetch(`${SIS_API_URL}/student/personal/info/${studentId}`, {
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

    const apiResult = await fetch(`${SIS_API_URL}/student`, {
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



const StudentController = {
    getAllStudentsByStatus,
    getStudentDetailByStudentId,
    saveStudent,
    updateStudentAcademicInfo,
    updateStudentPersonalInfo,
    activateStudent,
    passivateStudent,
    deleteStudent
};

export default StudentController;