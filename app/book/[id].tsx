import { useLocalSearchParams, useRouter } from "expo-router";
import {
    ActivityIndicator,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { icons } from "@/constants/icons";
import { fetchBookDetails } from "@/services/api";
import useFetch from "@/services/usefetch";

interface InfoProps {
  label: string;
  value?: string | number | null;
}

const Info = ({ label, value }: InfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-light-200 font-normal text-sm">{label}</Text>
    <Text className="text-light-100 font-bold text-sm mt-2">
      {value || "N/A"}
    </Text>
  </View>
);

const Details = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const { data: book, loading } = useFetch(() => fetchBookDetails(id as string));

  if (loading)
    return (
      <SafeAreaView className="bg-primary flex-1">
        <ActivityIndicator />
      </SafeAreaView>
    );

  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri:
                book?.thumbnail || "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
            }}
            className="w-full h-[550px]"
            resizeMode="stretch"
          />

          <TouchableOpacity className="absolute bottom-5 right-5 rounded-full size-14 bg-white flex items-center justify-center">
            <Image
              source={icons.play}
              className="w-6 h-7 ml-1"
              resizeMode="stretch"
            />
          </TouchableOpacity>
        </View>

        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-white font-bold text-xl">{book?.title}</Text>
          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-light-200 text-sm">
              {book?.publishedDate?.split("-")[0]}
            </Text>
          </View>

        <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
            <Image source={icons.star} className="size-4" />

            <Text className="text-white font-bold text-sm">
              {book?.averageRating ? Math.round(book?.averageRating) : "-"}/5
            </Text>

            <Text className="text-light-200 text-sm">
              ({book?.ratingsCount || 0} ratings)
            </Text>
          </View>

          <Info label="Authors" value={book?.authors?.join(" • ") || "N/A"} />
          <Info label="Categories" value={book?.categories?.join(" • ") || "N/A"} />
          <Info label="Pages" value={book?.pageCount ?? "N/A"} />
          <Info label="Publisher" value={book?.publisher || "N/A"} />
          <Info label="Language" value={book?.language || "N/A"} />
          <Info label="Description" value={book?.description || "N/A"} />
        </View>
      </ScrollView>

      <TouchableOpacity
        className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor="#fff"
        />
        <Text className="text-white font-semibold text-base">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Details;


