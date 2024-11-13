import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useOnyx} from 'react-native-onyx';
import ScreenWrapper from '@components/ScreenWrapper';
import useActiveWorkspace from '@hooks/useActiveWorkspace';
import useLocalize from '@hooks/useLocalize';
import useResponsiveLayout from '@hooks/useResponsiveLayout';
import useThemeStyles from '@hooks/useThemeStyles';
import * as Browser from '@libs/Browser';
import BottomTabBar from '@libs/Navigation/AppNavigator/createCustomBottomTabNavigator/BottomTabBar';
import TopBar from '@libs/Navigation/AppNavigator/createCustomBottomTabNavigator/TopBar';
import Performance from '@libs/Performance';
import SidebarLinksData from '@pages/home/sidebar/SidebarLinksData';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import SCREENS from '@src/SCREENS';

function BaseSidebarScreen() {
    const styles = useThemeStyles();
    const {activeWorkspaceID} = useActiveWorkspace();
    const {translate} = useLocalize();
    const {shouldUseNarrowLayout} = useResponsiveLayout();
    // const [activeWorkspace] = useOnyx(`${ONYXKEYS.COLLECTION.POLICY}${activeWorkspaceID ?? -1}`);

    useEffect(() => {
        Performance.markStart(CONST.TIMING.SIDEBAR_LOADED);
    }, []);

    // useEffect(() => {
    //     if (!!activeWorkspace || activeWorkspaceID === undefined) {
    //         return;
    //     }

    //     Navigation.switchPolicyID({policyID: undefined});
    //     updateLastAccessedWorkspace(undefined);
    // }, [activeWorkspace, activeWorkspaceID]);

    const shouldDisplaySearch = shouldUseNarrowLayout;

    return (
        <ScreenWrapper
            shouldEnableKeyboardAvoidingView={false}
            style={[styles.sidebar, Browser.isMobile() ? styles.userSelectNone : {}]}
            testID={BaseSidebarScreen.displayName}
            bottomContent={<BottomTabBar selectedTab={SCREENS.HOME} />}
        >
            {({insets}) => (
                <>
                    <TopBar
                        breadcrumbLabel={translate('common.inbox')}
                        activeWorkspaceID={activeWorkspaceID}
                        shouldDisplaySearch={shouldDisplaySearch}
                    />
                    <View style={[styles.flex1]}>
                        <SidebarLinksData insets={insets} />
                    </View>
                </>
            )}
        </ScreenWrapper>
    );
}

BaseSidebarScreen.displayName = 'BaseSidebarScreen';

export default BaseSidebarScreen;
