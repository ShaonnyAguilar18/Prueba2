import type {SubStepProps} from '@hooks/useSubStep/types';
import type {CorpayFormField} from '@src/types/onyx/CorpayFields';

type BankInfoSubStepProps = SubStepProps & {corpayFields?: CorpayFormField[]};

export type {BankInfoSubStepProps, CorpayFormField};
