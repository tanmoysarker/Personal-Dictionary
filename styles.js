import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #222;
`;
export const SearchButtonContainer = styled.TouchableOpacity`
  elevation: 8;
  padding-vertical: 10px;
  padding-horizontal: 12px;
  background-color: grey;
  marginBottom: 30px;
  border: #fff;
`;

export const SearchButtonText = styled.Text`
  font-size: 16;
  color: #fff;
  font-weight: bold;
  align-self: center;
  text-transform: uppercase;
`;
export const FavouriteButtonContainer = styled.TouchableOpacity`
  elevation: 8;
  padding-vertical: 10px;
  padding-horizontal: 12px;
  background-color: grey;
  marginBottom: 30px;
  border: #fff
`;

export const FavouriteButtonText = styled.Text`
  font-size: 16;
  color: #fff;
  font-weight: bold;
  align-self: center;
  text-transform: uppercase;
`;

export const SaveButtonContainer = styled.TouchableOpacity`
  elevation: 8;
  padding-vertical: 10px;
  padding-horizontal: 12px;
  marginBottom: 30px;
  border: #fff;
  marginTop: 30px;
`;

export const SaveButtonText = styled.Text`
  font-size: 16;
  color: #fff;
  font-weight: bold;
  align-self: center;
  text-transform: uppercase;
`;
