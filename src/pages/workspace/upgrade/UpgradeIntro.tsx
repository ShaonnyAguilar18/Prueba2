import React from 'react';
import {View} from 'react-native';
import type {ValueOf} from 'type-fest';
import Avatar from '@components/Avatar';
import Badge from '@components/Badge';
import Button from '@components/Button';
import Icon from '@components/Icon';
import * as Expensicon from '@components/Icon/Expensicons';
import * as Illustrations from '@components/Icon/Illustrations';
import Text from '@components/Text';
import TextLink from '@components/TextLink';
import useLocalize from '@hooks/useLocalize';
import useResponsiveLayout from '@hooks/useResponsiveLayout';
import useThemeStyles from '@hooks/useThemeStyles';
import Navigation from '@libs/Navigation/Navigation';
import CONST from '@src/CONST';
import ROUTES from '@src/ROUTES';

type Props = {
    buttonDisabled?: boolean;
    loading?: boolean;
    feature?: ValueOf<typeof CONST.UPGRADE_FEATURE_INTRO_MAPPING>;
    onUpgrade: () => void;
};

function UpgradeIntro({feature, onUpgrade, buttonDisabled, loading}: Props) {
    const styles = useThemeStyles();
    const {isExtraSmallScreenWidth} = useResponsiveLayout();
    const {translate} = useLocalize();

    if (!feature) {
        return (
            <CommonCorporateFeatures
                onUpgrade={onUpgrade}
                buttonDisabled={buttonDisabled}
                loading={loading}
            />
        );
    }
    const isIllustration = feature.icon in Illustrations;
    const iconSrc = isIllustration ? Illustrations[feature.icon as keyof typeof Illustrations] : Expensicon[feature.icon as keyof typeof Expensicon];
    const iconAdditionalStyles = feature.id === CONST.UPGRADE_FEATURE_INTRO_MAPPING.approvals.id ? styles.br0 : undefined;

    return (
        <View style={styles.p5}>
            <View style={styles.workspaceUpgradeIntroBox({isExtraSmallScreenWidth})}>
                <View style={[styles.mb3, styles.flexRow, styles.justifyContentBetween]}>
                    {!isIllustration ? (
                        <Avatar
                            source={iconSrc}
                            type={CONST.ICON_TYPE_AVATAR}
                        />
                    ) : (
                        <Icon
                            src={iconSrc}
                            width={48}
                            height={48}
                            additionalStyles={iconAdditionalStyles}
                        />
                    )}
                    <Badge
                        icon={Expensicon.Unlock}
                        text={translate('workspace.upgrade.upgradeToUnlock')}
                        success
                    />
                </View>
                <View style={styles.mb5}>
                    <Text style={[styles.textHeadlineH1, styles.mb4]}>{translate(feature.title)}</Text>
                    <Text style={[styles.textNormal, styles.textSupporting, styles.mb4]}>{translate(feature.description)}</Text>
                    <Text style={[styles.textNormal, styles.textSupporting]}>
                        {translate(`workspace.upgrade.${feature.id}.onlyAvailableOnPlan`)}
                        <Text style={[styles.textSupporting, styles.textBold]}>{translate(`workspace.upgrade.pricing.amount`)}</Text>
                        {translate(`workspace.upgrade.pricing.perActiveMember`)}
                    </Text>
                </View>
                <Button
                    isLoading={loading}
                    text={translate('common.upgrade')}
                    success
                    onPress={onUpgrade}
                    isDisabled={buttonDisabled}
                    large
                />
            </View>
            <View style={styles.mt6}>
                <Text style={[styles.textNormal, styles.textSupporting]}>
                    {translate('workspace.upgrade.note.upgradeWorkspace')}{' '}
                    <TextLink
                        style={[styles.link]}
                        onPress={() => Navigation.navigate(ROUTES.SETTINGS_SUBSCRIPTION)}
                    >
                        {translate('workspace.upgrade.note.learnMore')}
                    </TextLink>{' '}
                    {translate('workspace.upgrade.note.aboutOurPlans')}
                </Text>
            </View>
        </View>
    );
}

function CommonCorporateFeatures({buttonDisabled, loading, onUpgrade}: {buttonDisabled?: boolean; loading?: boolean; onUpgrade: () => void}) {
    const styles = useThemeStyles();
    const {translate} = useLocalize();
    const {isExtraSmallScreenWidth} = useResponsiveLayout();

    const benefits = [
        translate('workspace.upgrade.commonFeatures.benefits.benefit1'),
        translate('workspace.upgrade.commonFeatures.benefits.benefit2'),
        translate('workspace.upgrade.commonFeatures.benefits.benefit3'),
        translate('workspace.upgrade.commonFeatures.benefits.benefit4'),
    ];

    return (
        <View style={[styles.m5, styles.workspaceUpgradeIntroBox({isExtraSmallScreenWidth})]}>
            <View style={[styles.mb3]}>
                <Icon
                    src={Illustrations.ShieldYellow}
                    width={48}
                    height={48}
                />
            </View>
            <View style={styles.mb5}>
                <Text style={[styles.textHeadlineH1, styles.mb4]}>{translate('workspace.upgrade.commonFeatures.title')}</Text>
                <Text style={[styles.textNormal, styles.textSupporting, styles.mb4]}>{translate('workspace.upgrade.commonFeatures.note')}</Text>
                {benefits.map((benefit) => (
                    <View
                        key={benefit}
                        style={[styles.pl2, styles.flexRow]}
                    >
                        <Text style={[styles.textNormal, styles.textSupporting]}>• </Text>
                        <Text style={[styles.textNormal, styles.textSupporting]}>{benefit}</Text>
                    </View>
                ))}
                <Text style={[styles.textNormal, styles.textSupporting, styles.mt4]}>
                    {translate('workspace.upgrade.commonFeatures.benefits.note')}{' '}
                    <TextLink
                        style={[styles.link]}
                        onPress={() => Navigation.navigate(ROUTES.SETTINGS_SUBSCRIPTION)}
                    >
                        {translate('workspace.upgrade.commonFeatures.benefits.learnMore')}
                    </TextLink>{' '}
                    {translate('workspace.upgrade.commonFeatures.benefits.pricing')}
                </Text>
            </View>
            <Button
                isLoading={loading}
                text={translate('common.upgrade')}
                success
                onPress={onUpgrade}
                isDisabled={buttonDisabled}
                large
            />
        </View>
    );
}

export default UpgradeIntro;
