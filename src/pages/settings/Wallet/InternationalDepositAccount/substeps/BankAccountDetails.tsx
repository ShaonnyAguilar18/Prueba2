import React, {useCallback} from 'react';
import {View} from 'react-native';
import CurrencyPicker from '@components/CurrencyPicker';
import FormProvider from '@components/Form/FormProvider';
import InputWrapper from '@components/Form/InputWrapper';
import type {FormInputErrors, FormOnyxValues} from '@components/Form/types';
import Icon from '@components/Icon';
import * as Expensicons from '@components/Icon/Expensicons';
import TextInput from '@components/TextInput';
import TextLink from '@components/TextLink';
import ValuePicker from '@components/ValuePicker';
import useInternationalBankAccountFormSubmit from '@hooks/useInternationalBankAccountFormSubmit';
import useLocalize from '@hooks/useLocalize';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import * as ErrorUtils from '@libs/ErrorUtils';
import type {CustomSubStepProps} from '@pages/settings/Wallet/InternationalDepositAccount/types';
import * as BankAccounts from '@userActions/BankAccounts';
import Text from '@src/components/Text';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';

function BankAccountDetails({isEditing, onNext, resetScreenIndex, formValues, fieldsMap}: CustomSubStepProps) {
    const {translate} = useLocalize();
    const styles = useThemeStyles();
    const theme = useTheme();

    const handleSubmit = useInternationalBankAccountFormSubmit({
        fieldIds: Object.keys(fieldsMap[CONST.CORPAY_FIELDS.STEPS_NAME.BANK_ACCOUNT_DETAILS] ?? {}),
        onNext,
        shouldSaveDraft: true,
    });

    const onCurrencySelected = useCallback(
        (value: string) => {
            if (formValues.bankCurrency === value) {
                return;
            }
            BankAccounts.fetchCorpayFields(formValues.bankCountry, value);
            resetScreenIndex?.(CONST.CORPAY_FIELDS.INDEXES.MAPPING.BANK_ACCOUNT_DETAILS);
        },
        [formValues.bankCountry, formValues.bankCurrency, resetScreenIndex],
    );

    const validate = useCallback(
        (values: FormOnyxValues<typeof ONYXKEYS.FORMS.INTERNATIONAL_BANK_ACCOUNT_FORM>): FormInputErrors<typeof ONYXKEYS.FORMS.INTERNATIONAL_BANK_ACCOUNT_FORM> => {
            const errors = {};
            const fields = fieldsMap[CONST.CORPAY_FIELDS.STEPS_NAME.BANK_ACCOUNT_DETAILS];
            for (const fieldName in fields) {
                if (!fieldName) {
                    // eslint-disable-next-line no-continue
                    continue;
                }
                if (fields[fieldName].isRequired && values[fieldName] === '') {
                    ErrorUtils.addErrorMessage(errors, fieldName, translate('common.error.fieldRequired'));
                }
                fields[fieldName].validationRules.forEach((rule) => {
                    const regExpCheck = new RegExp(rule.regEx);
                    if (!regExpCheck.test(values[fieldName])) {
                        ErrorUtils.addErrorMessage(errors, fieldName, rule.errorMessage);
                    }
                });
            }
            return errors;
        },
        [fieldsMap, translate],
    );

    return (
        <FormProvider
            formID={ONYXKEYS.FORMS.INTERNATIONAL_BANK_ACCOUNT_FORM}
            submitButtonText={translate(isEditing ? 'common.confirm' : 'common.next')}
            onSubmit={handleSubmit}
            validate={validate}
            style={[styles.flexGrow1, styles.mt3]}
            submitButtonStyles={[styles.ph5, styles.mb0]}
            enabledWhenOffline
        >
            <View style={styles.ph5}>
                <Text style={[styles.textHeadlineLineHeightXXL, styles.mb6]}>{translate('addPersonalBankAccount.accountDetailsStepHeader')}</Text>
                <View style={[styles.mhn5]}>
                    <CurrencyPicker
                        value={formValues.bankCurrency}
                        onInputChange={onCurrencySelected}
                    />
                </View>
                {Object.values(fieldsMap[CONST.CORPAY_FIELDS.STEPS_NAME.BANK_ACCOUNT_DETAILS] ?? {}).map((field) => (
                    <View
                        style={(field.valueSet ?? []).length > 0 ? [styles.mhn5, styles.pv1] : [styles.pv2]}
                        key={field.id}
                    >
                        <InputWrapper
                            InputComponent={(field.valueSet ?? []).length > 0 ? ValuePicker : TextInput}
                            inputID={field.id}
                            defaultValue={formValues[field.id]}
                            label={field.label + (field.isRequired ? '' : ` (${translate('common.optional')})`)}
                            items={(field.valueSet ?? []).map(({id, text}) => ({value: id, label: text}))}
                        />
                    </View>
                ))}
                <View style={[styles.flexRow, styles.alignItemsCenter, styles.mt4]}>
                    <Icon
                        src={Expensicons.QuestionMark}
                        width={12}
                        height={12}
                        fill={theme.icon}
                    />
                    <View style={[styles.ml2, styles.dFlex, styles.flexRow]}>
                        <TextLink
                            style={[styles.textMicro]}
                            href={CONST.ENCRYPTION_AND_SECURITY_HELP_URL}
                        >
                            {translate('addPersonalBankAccount.howDoWeProtectYourData')}
                        </TextLink>
                    </View>
                </View>
            </View>
        </FormProvider>
    );
}

BankAccountDetails.displayName = 'BankAccountDetails';

export default BankAccountDetails;
