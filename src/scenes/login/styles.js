import { StyleSheet } from 'react-native';
import { WHITE, GREY, APP_COLOR } from '_styles/colors';
import { scaleFont } from '_styles/mixins';

export default StyleSheet.create({
    keyboardAvoidViewing: { flex: 1 },
    topContainer: {
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 32,
        flex: 1, 
        justifyContent: "center",
        backgroundColor: WHITE,
    },
    title: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: scaleFont(50)
    },
    spacing: {
        marginVertical: 10,
    },
    forgotPass: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'wrap-reverse',
        alignItems: 'center',
        marginTop: 10,
        paddingVertical: 19
    },
    alternativeLogin: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    authArea: {
        borderBottomWidth: 1,
        borderBottomColor: GREY,
        paddingBottom: 10,
    },
    btnContent: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    altLoginBtn: {
        margin: 5
    },
    pText: {
        color: APP_COLOR,
        fontWeight: '400'
    },
    bText: {
        color: APP_COLOR,
        fontWeight: '500'
    },
    thumbContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    footer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    },
    toRow: {
        flexDirection: 'row',
        paddingVertical: 5
    },
    loadingView: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})