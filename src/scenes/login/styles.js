import { StyleSheet } from 'react-native';
import { WHITE, GREY } from '_styles/colors';


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
    },
    spacing: {
        marginVertical: 10,
    },
    forgotPass: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: GREY,
        paddingVertical: 19
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
    }
})