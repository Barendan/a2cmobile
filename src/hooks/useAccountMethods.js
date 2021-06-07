import React from 'react';
import { Platform } from 'react-native';
import { sha256 } from 'react-native-sha256';
import { useDispatch, useSelector } from 'react-redux';

import { useTranslation } from "react-i18next";
import moment from 'moment';

import { MemberService } from '_services';
import { HelperMethods } from '_helpers';
import { AppSettings } from '_utils';
import { login } from '_store/user';
import { updatePlan, setMemberPlans } from '_store/plan';

const useAccountMethods = () => {

    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [loading, setLoading] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [disableNextButton, setDisableNextButton] = React.useState(false);
    const [tempCodeValidated, setTempCodeValidated] = React.useState(false);

    //Member Information START //
    /*************************/
    /*************************/
    const [memberRecord, setMemberRecord] = React.useState(null);

    const [memberInformation, setMemberInformation] = React.useState({
        memberID: '',
        dateOfBirth: '',
        zipcode: ''
    });

    const updateMemberInformation = React.useCallback((key, value) => {
        setMemberInformation(memberInformation => {
            return {
                ...memberInformation,
                [key]: value,
            };
        });
    }, []);

    const onValidateMemberInfo = () => {

        const {
            memberID,
            dateOfBirth,
            zipcode
        } = memberInformation;

        setErrorMessage('');
        setMemberRecord(null);
        setLoading(true);
        MemberService.validateMemberInfo(memberID, dateOfBirth, zipcode)
            .then((data) => {
                setLoading(false);
                setMemberRecord(data.memberInfo);
            })
            .catch((err) => {
                //alert(JSON.stringify(err))
                setErrorMessage(err.message);
                setLoading(false);
            });

    }

    React.useEffect(() => {
        setDisableNextButton((memberInformation.memberID.length === 0
            || memberInformation.dateOfBirth.length === 0
            || memberInformation.zipcode.length < 5));
    }, [memberInformation]);


    const onDateOfBirth = (value) => {
        if (value.length < 11) {
            let formattedDob = value.replace(/^(\d\d)(\d)$/g, '$1/$2').replace(/^(\d\d\/\d\d)(\d+)$/g, '$1/$2').replace(/[^\d\/]/g, '');
            updateMemberInformation('dateOfBirth', formattedDob);
        }
    }

    const isDOBValid = (dob, age = null) => {
        if (!moment(dob).isValid()) return false

        const minAge = age || 15
        const maxAge = 105

        if (moment().diff(dob, 'years', false) > maxAge) return false //check max age
        if (moment().diff(dob, 'years', true) < minAge) return false //check min age
        if (moment().diff(dob, 'days', true) < 1) return false //today && future

        return true
    }

    const onZipcode = (value) => {
        if (value.length < 6) {
            let formattedZipcode = value.replace(/[^\d\/]/g, '');
            updateMemberInformation('zipcode', formattedZipcode);
        }
    }
    //Member Information END //
    /*************************/
    /*************************/

    //Member Login Information START //
    /*************************/
    /*************************/
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [randomGenerateCode, setRandomGenerateCode] = React.useState('');
    const [showValidate, setShowValidate] = React.useState(false);
    const [memberLogin, setMemberLogin] = React.useState(null);

    //Member Login Information
    const [loginMethod, setLoginMethod] = React.useState({
        loginType: '',
        login: '',
        tempCode: ''
    });

    const updateLoginMethod = React.useCallback((key, value) => {
        setLoginMethod(loginMethod => {
            return {
                ...loginMethod,
                [key]: value,
            };
        });
    }, []);

    const passwordResetLogin = (value) => {
        updateLoginMethod('loginType', 'na');
        updateLoginMethod('login', value);
    }

    //when selected index, generate random generated code that will be emailed/texted to member
    React.useEffect(() => {
        //incase of a password reset aka "forgot password", we don't know if login will be an email or phone_number, so need to account for both.
        updateLoginMethod('loginType', selectedIndex === 0 ? 'email' : 'phone_number');
        updateLoginMethod('login', '');
        let randomCode = Math.floor(1000 + Math.random() * 9000);
        updateLoginMethod('tempCode', randomCode);
    }, [selectedIndex]);

    //check if valid email or loginType method is set
    React.useEffect(() => {

        //alert(loginMethod.loginType);
        if(loginMethod.loginType === "na") {
            setDisableNextButton(false);
        } else {
            setDisableNextButton(loginMethod.loginType.length === 0 || (loginMethod.loginType === "email" ? !HelperMethods.isValidEmail(loginMethod.login) : loginMethod.login.length < 9));
        }

        if (loginMethod.login.length === 0) {
            setShowValidate(false);
        }

    }, [loginMethod]);


    //allow only digits for phone numbers
    const onLoginMethod = (type, value) => {

        let formattedValue = value;
        if (type === 'phone_number') {
            formattedValue = value.replace(/[^\d\/]/g, '');
        }
        updateLoginMethod('login', formattedValue);
    }

    const onSendTempPassCode = () => {

        let payload = {
            loginType: loginMethod.loginType,
            login: loginMethod.login,
            tempCode: loginMethod.tempCode
        };

        setErrorMessage('');
        setLoading(true);

        MemberService.sendTempPassCode(payload)
            .then((data) => {
                setLoading(false);
                setShowValidate(true);
            })
            .catch((err) => {
                setErrorMessage(err.message);
                setLoading(false);
            });

    }

    const onValidateTemporaryCode = () => {
        const { login, loginType, tempCode } = loginMethod;

        if (randomGenerateCode != tempCode) {
            setErrorMessage(t('temp_code_error'));
        } else {
            setMemberLogin({ loginType: loginType, login });
            setErrorMessage('');
            setTempCodeValidated(true);
        }
    }


    const onValidateMemberLogin = () => {

        const {
            login
        } = loginMethod;

        setErrorMessage('');
        setMemberLogin(null);
        setLoading(true);
        MemberService.validateMemberLogin(login)
            .then((data) => {
                setLoading(false);
                setMemberLogin(data.user);
            })
            .catch((err) => {
                setErrorMessage(t('member_not_found'));
                setLoading(false);
            });

    }

    const fetchMemberRecord = (login) => {

        setErrorMessage('');
        setMemberRecord(null);
        setLoading(true);
        MemberService.getUserRecord(login)
            .then((data) => {
                setLoading(false);
                setMemberRecord(data.user);
            })
            .catch((err) => {
                setErrorMessage(err.message);
                setLoading(false);
            });

    }


    //Member Login Information END //
    /*************************/
    /*************************/


    //Member Password Information START //
    /*************************/
    /*************************/
    const [memberPassword, setMemberPassword] = React.useState(null);

    //Member Password Information
    const [passwordInformation, setPasswordInformation] = React.useState({
        password: '',
        confirmPassword: ''
    });

    const updatePasswordInformation = React.useCallback((key, value) => {
        setPasswordInformation(passwordInformation => {
            return {
                ...passwordInformation,
                [key]: value,
            };
        });
    }, []);

    const [passwordRequirements, setPasswordRequirements] = React.useState({
        eightCharactersMinimum: false,
        oneUppercaseLetter: false,
        oneLowercaseLetter: false,
        oneNumber: false,
        oneSpecialSymbol: false
    });

    const updatePasswordRequirements = React.useCallback((key, value) => {
        setPasswordRequirements(passwordRequirements => {
            return {
                ...passwordRequirements,
                [key]: value,
            };
        });
    }, []);

    //check if valid password
    React.useEffect(() => {

        const { password, confirmPassword } = passwordInformation;

        //individualRequirements check
        updatePasswordRequirements('eightCharactersMinimum', password.length > 8);
        updatePasswordRequirements('oneUppercaseLetter', /^(?=.*[A-Z])/.test(password));
        updatePasswordRequirements('oneLowercaseLetter', /^(?=.*[a-z])/.test(password))
        updatePasswordRequirements('oneNumber', /^(?=.*[0-9])/.test(password))
        updatePasswordRequirements('oneSpecialSymbol', /^(?=.*[!@#\$%\^&\*])/.test(password))

        if (password.length === 0 || confirmPassword.length === 0 || (password != confirmPassword)) {
            setDisableNextButton(true);
        } else {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
            if (!passwordRegex.test(password)) {
                setDisableNextButton(true);
            } else {
                setDisableNextButton(false);
            }
        }

        if (password != confirmPassword) {
            setErrorMessage(t('password_mismatch_error'));
        } else {
            setErrorMessage('');
        }

    }, [passwordInformation]);


    const onValidatePasswords = () => {
        const { password, confirmPassword } = passwordInformation;

        if (password != confirmPassword) {
            setErrorMessage(t('password_mismatch_error'));
        } else {
            setMemberPassword(passwordInformation);
            setErrorMessage('');
        }
    }

    //Member Password Information END //
    /*************************/
    /*************************/

    const registerUser = async (memberRecord, memberLogin) => {

        setErrorMessage('');

        const { NETMember_ID, memberID, firstName, lastName } = memberRecord;
        const { login, loginType } = memberLogin;
        const { password } = passwordInformation;

        const hashedPassword = await sha256(password);

        let payload = {
            NETMember_ID,
            memberID,
            firstName,
            lastName,
            login,
            loginType,
            password: hashedPassword
        };

        setLoading(true);
        MemberService.registerUser(payload)
            .then((data) => {
                setLoading(false);
                //after account created successfully, login the user
                onLoginUser(login, hashedPassword);
            })
            .catch((err) => {
                setErrorMessage(err.message);
                setLoading(false);
            });
    }

    const onLoginUser = (memberLogin, password) => {
        setErrorMessage('');

        let payload = {
            login: memberLogin,
            password: password,
            appOS: Platform.OS,
            appVersion: AppSettings.appVersion
        };

        setLoading(true);
        MemberService.loginUser(payload)
            .then((data) => {
                setLoading(false);
                if (data.user && data.user.MemberPlans && data.user.MemberPlans.length > 0) {
                    dispatch(setMemberPlans(data.user.MemberPlans));
                    dispatch(updatePlan(data.user.MemberPlans[0])); //default to first plan
                }
                dispatch(login(data.user));
            })
            .catch((err) => {
                setErrorMessage(err.message);
                setLoading(false);
            });
    }

    const updatePassword = async (memberLogin) => {

        setErrorMessage('');

        const { id, login } = memberLogin;
        const { password } = passwordInformation;

        const hashedPassword = await sha256(password);

        let payload = {
            id,
            password: hashedPassword
        };

        setLoading(true);
        MemberService.updatePassword(payload)
            .then((data) => {
                setLoading(false);
                //after account created successfully, login the user
                onLoginUser(login, hashedPassword);
            })
            .catch((err) => {
                setErrorMessage(err.message);
                setLoading(false);
            });
    }

    //

    return {
        loading,
        errorMessage,
        setErrorMessage,
        memberInformation,
        disableNextButton,
        memberRecord,
        updateMemberInformation,
        onDateOfBirth,
        onZipcode,
        onValidateMemberInfo,
        onValidateMemberLogin,
        selectedIndex,
        randomGenerateCode,
        showValidate,
        tempCodeValidated,
        memberLogin,
        loginMethod,
        updateLoginMethod,
        setSelectedIndex,
        setRandomGenerateCode,
        onLoginMethod,
        onValidateTemporaryCode,
        onSendTempPassCode,
        setShowValidate,
        passwordInformation,
        passwordRequirements,
        updatePasswordInformation,
        onValidatePasswords,
        registerUser,
        fetchMemberRecord,
        updatePassword,
        passwordResetLogin
    };
};

export default useAccountMethods;