import {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {Text, View} from 'react-native';

const Single = ({route}: any) => {
  const item: MediaItemWithOwner = route.params;

  return (
    <View>
      <Text>{item.title}</Text>
    </View>
  );
};

export default Single;
