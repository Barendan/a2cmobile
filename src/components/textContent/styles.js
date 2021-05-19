import { StyleSheet } from 'react-native';
import { Colors } from 'src/libs/color';

export default StyleSheet.create({
    wrapper: {
        borderRadius: 5,
        borderColor: Colors.Grey,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }, 
    container: {
        backgroundColor: Colors.White,
        paddingHorizontal: 12,
        paddingVertical: 16,
        marginVertical: 1,
        marginLeft: 1,
        flex: 1,
        marginRight: 1
    },
    hideRightMargin: {
        marginRight: 0,

    },
    input: {
        fontSize: 16,
        fontWeight: "500",
        paddingVertical: 0
    },
    textArea: {
        textAlignVertical: 'top'
    },
    placeholder: {
        fontWeight: "400"
    },
    rightComponentWrapper: {
        alignSelf: "flex-end"
    },
    leftComponentWrapper: {
        alignSelf: "flex-start"
    }
})