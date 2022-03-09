import Cookies from "universal-cookie";

const cookies = new Cookies();

const saveData = (response) => {
    saveLoginTime();
    saveNumber(response.academicInfoResponse.studentId)
    saveFacultyNumber(response.academicInfoResponse.departmentResponse.facultyResponse.facultyId);
    saveDepartmentNumber(response.academicInfoResponse.departmentResponse.departmentId);
    saveFullName(response.personalInfoResponse.name, response.personalInfoResponse.surname);
    saveStatus(response.academicInfoResponse.status);
}

function clearData() {
    cookies.remove('studentLoginTime', {path: '/'});
    cookies.remove('studentNumber', {path: '/'});
    cookies.remove('studentFacultyNumber', {path: '/'});
    cookies.remove('studentDepartmentNumber', {path: '/'});
    cookies.remove('studentFullName', {path: '/'});
    cookies.remove('studentStatus', {path: '/'});
}


/**
 * Student Login Time
 */
const getLoginTimeWithContext = (context) => {
    return context.req.cookies['studentLoginTime'];
}

const isLoginTimeout = () => {
    const studentLoginTime = getLoginTime();
    const sessionTime = new Date() - studentLoginTime;
    return sessionTime > 15;
}

function saveLoginTime() {
    cookies.set('studentLoginTime', new Date(), {path: '/'});
}


/**
 * Student Number
 */
const getNumber = () => {
    return cookies.get('studentNumber');
}

const getNumberWithContext = (context) => {
    return context.req.cookies['studentNumber'];
}

function saveNumber(studentNumber) {
    cookies.set('studentNumber', studentNumber, {path: '/'});
}


/**
 * Student Faculty Number
 */
const getFacultyNumber = () => {
    return cookies.get('studentFacultyNumber');
}

const getFacultyNumberWithContext = (context) => {
    return context.req.cookies['studentFacultyNumber'];
}

function saveFacultyNumber(studentFacultyNumber) {
    cookies.set('studentFacultyNumber', studentFacultyNumber, {path: '/'});
}


/**
 * Student Department Number
 */
const getDepartmentNumber = () => {
    return cookies.get('studentDepartmentNumber');
}

const getDepartmentNumberWithContext = (context) => {
    return context.req.cookies['studentDepartmentNumber'];
}

function saveDepartmentNumber(studentDepartmentNumber) {
    cookies.set('studentDepartmentNumber', studentDepartmentNumber, {path: '/'});
}


/**
 * Student Full Name
 */
const getFullName = () => {
    return cookies.get('studentFullName');
}

const getFullNameWithContext = (context) => {
    return context.req.cookies['studentFullName'];
}

function saveFullName(studentName, studentSurname) {
    const studentFullName = studentName + " " + studentSurname;
    cookies.set('studentFullName', studentFullName, {path: '/'});
}


/**
 * Student Status
 */
const getStatus = () => {
    return cookies.get('studentStatus');
}

const getStatusWithContext = (context) => {
    return context.req.cookies['studentStatus'];
}

function saveStatus(studentStatus) {
    cookies.set('studentStatus', studentStatus, {path: '/'});
}

const SisStudentStorage = {
    saveData,
    clearData,
    getLoginTimeWithContext,
    isLoginTimeout,
    getNumber,
    getNumberWithContext,
    getFacultyNumber,
    getFacultyNumberWithContext,
    getDepartmentNumber,
    getDepartmentNumberWithContext,
    getFullName,
    getFullNameWithContext,
    getStatus,
    getStatusWithContext
};

export default SisStudentStorage;