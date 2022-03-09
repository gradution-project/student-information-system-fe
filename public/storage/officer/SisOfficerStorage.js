import Cookies from "universal-cookie";

const cookies = new Cookies();

const saveData = (response) => {
    saveLoginTime();
    saveNumber(response.academicInfoResponse.officerId)
    saveFacultyNumber(response.academicInfoResponse.facultyResponse.facultyId);
    saveFullName(response.personalInfoResponse.name, response.personalInfoResponse.surname);
    saveStatus(response.academicInfoResponse.status);
};

function clearData() {
    cookies.remove('officerLoginTime', {path: '/'});
    cookies.remove('officerNumber', {path: '/'});
    cookies.remove('officerFacultyNumber', {path: '/'});
    cookies.remove('officerFullName', {path: '/'});
    cookies.remove('officerStatus', {path: '/'});
}


/**
 * Officer Login Time
 */
const getLoginTimeWithContext = (context) => {
    return context.req.cookies['officerLoginTime'];
};

const isLoginTimeout = () => {
    const officerLoginTime = getLoginTime();
    const sessionTime = new Date() - officerLoginTime;
    return sessionTime > 15;
};

function saveLoginTime() {
    cookies.set('officerLoginTime', new Date(), {path: '/'});
}


/**
 * Officer Number
 */
const getNumber = () => {
    return cookies.get('officerNumber');
};

const getNumberWithContext = (context) => {
    return context.req.cookies['officerNumber'];
};

function saveNumber(officerNumber) {
    cookies.set('officerNumber', officerNumber, {path: '/'});
}


/**
 * Officer Faculty Number
 */
const getFacultyNumber = () => {
    return cookies.get('officerFacultyNumber');
};

const getFacultyNumberWithContext = (context) => {
    return context.req.cookies['officerFacultyNumber'];
};

function saveFacultyNumber(officerFacultyNumber) {
    cookies.set('officerFacultyNumber', officerFacultyNumber, {path: '/'});
}


/**
 * Officer Full Name
 */
const getFullName = () => {
    return cookies.get('officerFullName');
};

const getFullNameWithContext = (context) => {
    return context.req.cookies['officerFullName'];
};

function saveFullName(officerName, officerSurname) {
    const officerFullName = officerName + " " + officerSurname;
    cookies.set('officerFullName', officerFullName, {path: '/'});
}


/**
 * Officer Status
 */
const getStatus = () => {
    return cookies.get('officerStatus');
};

const getStatusWithContext = (context) => {
    return context.req.cookies['officerStatus'];
};

function saveStatus(officerStatus) {
    cookies.set('officerStatus', officerStatus, {path: '/'});
}


const SisOfficerStorage = {
    saveData,
    clearData,
    getLoginTimeWithContext,
    isLoginTimeout,
    getNumber,
    getNumberWithContext,
    getFacultyNumber,
    getFacultyNumberWithContext,
    getFullName,
    getFullNameWithContext,
    getStatus,
    getStatusWithContext
};

export default SisOfficerStorage;