import { Keyboard, Pressable,ScrollView, TextInput, TextInputProps, TouchableOpacity } from 'react-native'
import React from 'react'
import { VStack } from '@/gluestack/ui/vstack'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Box } from '@/gluestack/ui/box'
import { Text } from '@/gluestack/ui/text'
import { Image } from 'react-native'
import { IVehicleItem } from '@/app/types/vehicle.interface'
import { Dimensions } from 'react-native'
import { CloseIcon, Icon } from '@/gluestack/ui/icon'
import { ArrowDownUp, ArrowLeft, Bike, Car, CarFront, Check, CircleAlert, Pencil, Truck } from 'lucide-react-native'
import { useRouter } from 'expo-router'
import { HStack } from '@/gluestack/ui/hstack'
import { Button, ButtonText } from '@/gluestack/ui/button'
import * as Calendar from 'expo-calendar';
import { useToast } from '@/gluestack/ui/toast'
import CustomToast from '../../ui/CustomToast'
import { AlertDialog, AlertDialogBackdrop, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader } from '@/gluestack/ui/alert-dialog'
import { Heading } from '@/gluestack/ui/heading'
import { Input, InputField, InputIcon, InputSlot } from '@/gluestack/ui/input'
import { Badge, BadgeIcon, BadgeText } from '@/gluestack/ui/badge'
import { Divider } from '@/gluestack/ui/divider'
import { Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader } from '@/gluestack/ui/modal'
import { Center } from '@/gluestack/ui/center';
import { useVehicleContext } from '../../contexts/VehicleContext';
import { Textarea, TextareaInput } from '@/gluestack/ui/textarea';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Vehicle: React.FC<IVehicleItem> = ({ vehicle }) => {
  const { updateObservation, updateOdometerReading, vehicles } = useVehicleContext();
  const [odometerReading, setOdometerReading] = React.useState<string>('');
  const [showAlertDialog, setShowAlertDialog] = React.useState(false)
  const [isEditable, setIsEditable] = React.useState<boolean>(false)
  const [reminderDate, setReminderDate] = React.useState<Date>(new Date())
  const [observation, setObservation] = React.useState<string>(vehicle.observation)
  const handleClose = () => setShowAlertDialog(false)
  const toast = useToast()
  const { height } = Dimensions.get('window')
  const router = useRouter();
  const [showModal, setShowModal] = React.useState(false)
  const ref = React.useRef(null)
  const modalRef = React.useRef(null)
  const inputRef = React.useRef<TextInput & TextInputProps>(null); 
  // const topHeight = Platform.OS === 'ios' ? height * 0.06 : height * 0.02;

  const currentVehicle = vehicles.find(v => v.id === vehicle.id) || vehicle;

  const handleEdit = () => {
    setIsEditable(true);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 50);
  };

  const handleSave = () => {
    if (observation === vehicle.observation) {
      setIsEditable(false)
      return null
    }
    updateObservation(vehicle.id, observation)
    setIsEditable(false)
    Keyboard.dismiss()
  }

  const getVehicleIcon = (type: string) => {
    switch (type) {
      case 'Car':
        return Car;
      case 'Motorcycle':
        return Bike;
      case 'Truck':
        return Truck;
      default:
        return Car;
    }
  };

  const getVehicleImage = (type: string) => {
    switch (type) {
      case 'Car':
        return CarFront;
      case 'Motorcycle':
        return Bike;
      case 'Truck':
        return Truck;
      default:
        return Car;
    }
  };

  React.useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();


      if (status === 'granted') {
        try {
          await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        } catch (error) {
          console.error('Error fetching calendars:', error);
        }
      } else {
        toast.show({
          placement: "top",
          render: ({ id }) => {
            const toastId = "toast-" + id
            return (
              CustomToast({
                toastId: toastId,
                icon: CircleAlert,
                message: 'Calendar permission is required to add reminders.'
              })
            )
          }
        })
      }
    })();
  }, []);

  const addEventToCalendar = async () => {

    try {
      const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
      const defaultCalendar = calendars.find(cal => cal.source.name === 'Default') || calendars[0];

      const eventDetails = {
        title: `OilReminder for ${vehicle.name}`,
        startDate: new Date(reminderDate),
        endDate: new Date(reminderDate.getTime() + 60 * 60 * 1000), // Evento de 1 hora
        timeZone: 'GMT',
        notes: `Check oil pressure.`,
        calendarId: defaultCalendar.id,
      };

      await Calendar.createEventAsync(defaultCalendar.id, eventDetails);

      setShowModal(false)
      setReminderDate(new Date())

      toast.show({
        placement: "top",
        render: ({ id }) => {
          const toastId = "toast-" + id
          return (
            CustomToast({
              toastId: toastId,
              icon: CircleAlert,
              message: 'Event added in your calendar!'
            })
          )
        }
      })
    } catch (error) {
      console.error('Error adding event to calendar:', error);
      toast.show({
        placement: "top",
        render: ({ id }) => {
          const toastId = "toast-" + id
          return (
            CustomToast({
              toastId: toastId,
              icon: CircleAlert,
              message: 'Failed to add event to calendar.'
            })
          )
        }
      })
    }
  };

  const updateOdometer = async (id: number, odometer: string) => {
    updateOdometerReading(id, odometer)
    setShowAlertDialog(false)
  }



  return (
    <>
     <KeyboardAwareScrollView
                enableOnAndroid={true}
                extraHeight={20}
                extraScrollHeight={20}
                keyboardOpeningTime={0}
                resetScrollToCoords={{ x: 0, y: 0 }} // 
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
            >
      <ScrollView showsVerticalScrollIndicator={false} className='h-full w-full '
      >
        <VStack space='xl' className=''>
          <Box style={{ width: '100%', height: height * 0.25, overflow: 'hidden', position: 'relative' }}>
            {vehicle.image !== undefined ? (
              <Image
                source={{ uri: vehicle.image }}
                style={{ width: '100%', height: height * 0.25, position: 'absolute', overflow: 'hidden' }}
                resizeMode='cover'
              />
            ) : (
              <Box
                style={{ width: '100%', height: height * 0.25, position: 'absolute', overflow: 'hidden' }}
                className='bg-secondary-600'
              >
                <Icon
                  as={getVehicleImage(currentVehicle.type)}
                  size="image"
                  className='text-secondary-200 ml-10 p-4'

                />
              </Box>
            )}
            <Pressable
              className='z-10 mx-6'
              style={{ top: height * 0.06 }}
              onPress={() => { router.push('/(tabs)/') }}
            >
              <Icon
                as={ArrowLeft}
                size='lg'
                className='text-secondary-100  p-4'

              />
            </Pressable>
          </Box>
          <VStack className='px-6 gap-10'>
            <HStack space='xs' className='justify-between'>
              <Text bold size='2xl'>{currentVehicle.name}</Text>
              <Badge size='lg' className='gap-1 bg-secondary-300 rounded-2xl'>
                <BadgeText className='text-secondary-800'>{currentVehicle.type}</BadgeText>
                <BadgeIcon className='text-secondary-800' as={getVehicleIcon(currentVehicle.type)} />
              </Badge>
            </HStack>

            <VStack space='xs' className=''>
              <Text className='uppercase font-medium text-base'>Car Detail</Text>
              <HStack className='justify-between'>
                <Text>Kilometers</Text>
                <Text className='font-medium'>{Number(currentVehicle.odometer).toLocaleString()}
                  <Text className='text-sm font-normal'> km</Text>
                </Text>
              </HStack>
              <Divider className='my-0.5 bg-secondary-300' />
              <HStack className='justify-between'>
                <Text>Change Oil Interval</Text>
                <Text className='font-medium'>{Number(currentVehicle.oilInterval).toLocaleString()}
                  <Text className='text-sm font-normal'> km</Text>
                </Text>
              </HStack>
              <Divider className='my-0.5 bg-secondary-300' />
              <HStack className='justify-between'>
                <Text>Next Oil Change</Text>
                <Text className='font-medium'>{(Number(currentVehicle.odometer) + Number(currentVehicle.oilInterval)).toLocaleString()}
                  <Text className='text-sm font-normal'> km</Text>
                </Text>
              </HStack>
            </VStack>

            <Box className='bg-secondary-300 p-4 h-40 rounded-2xl'>
              <HStack className='justify-between items-center'>
                <Text className='text-base font-semibold text-secondary-700'>Observation</Text>
                <TouchableOpacity onPress={() => {
                  if (isEditable) {
                    handleSave();
                  } else {
                    handleEdit();
                  }
                }}>
                  <HStack className='items-center justify-center bg-secondary-100 px-2 py-1 rounded-2xl' space='xs'>
                    {!isEditable ? (
                      <>
                        <Text className='text-base text-secondary-800 font-medium'>Edit</Text>
                        <Icon as={Pencil} size='sm' className='stroke-secondary-700' />
                      </>
                    ) : (
                      <>
                        <Text className='text-base text-secondary-800 font-medium'>Save</Text>
                        <Icon as={Check} size='sm' className='stroke-secondary-700' />
                      </>
                    )}
                  </HStack>
                </TouchableOpacity>
              </HStack>
              <Textarea
                size="md"
                isReadOnly={false}
                isInvalid={false}
                isDisabled={!isEditable}
                className="w-full h-24 border-0"
              >
                <TextareaInput
                  ref={inputRef}
                  className='my-auto text-lg font-normal'
                  placeholder='Without observations'
                  value={observation}
                  onChangeText={text => setObservation(text)}
                  returnKeyType='default'
                />
              </Textarea>
            </Box>


          </VStack>
        </VStack>

      </ScrollView>
      </KeyboardAwareScrollView>

      <VStack space='md' style={{ bottom: (height * 0.03) }} className='px-6'>
        <Button className='rounded-2xl h-14' onPress={() => setShowModal(true)} ref={ref}>
          <ButtonText className='font-medium font-logo text-secondary-100 '>Add Reminder</ButtonText>
        </Button>
        <Button className='rounded-2xl h-14 bg-secondary-900' onPress={() => setShowAlertDialog(true)}>
          <ButtonText className='font-medium font-logo text-secondary-100 p-2'>Done</ButtonText>
        </Button>
      </VStack>

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
        }}
        finalFocusRef={modalRef}
        size="lg"
      >
        <ModalBackdrop className="bg-black" />
        <ModalContent className='bg-secondary-100 border-0 rounded-2xl'>
          <ModalHeader>
            <Heading size="md" className="text-typography-950">
              Add Reminder
            </Heading>
            <ModalCloseButton>
              <Icon
                as={CloseIcon}
                size="md"
                className="stroke-background-400 "
              />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody >
            <VStack space='md'>
              <Text className='text-base font-medium'>Select a date for your reminder</Text>
              <Center>

                <DateTimePicker
                  value={reminderDate}
                  mode="datetime"
                  themeVariant={"light"}
                  display="default"
                  onChange={(event, date) => setReminderDate(date || reminderDate)}
                />
              </Center>
            </VStack>

          </ModalBody>
          <ModalFooter className='w-full justify-between flex'>
            <Button
              className='w-5/12'
              variant="outline"
              action="secondary"
              onPress={() => {
                setShowModal(false)
              }}
            >
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button
              className='w-5/12'
              onPress={addEventToCalendar}
            >
              <ButtonText className='text-secondary-100'>Add</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <AlertDialog isOpen={showAlertDialog} onClose={handleClose} size="md">
        <AlertDialogBackdrop className="bg-black" />
        <AlertDialogContent className='bg-secondary-100 border-0'>
          <AlertDialogHeader>
            <Heading className="text-typography-950 font-semibold" size="md">
              Has the oil been changed?
            </Heading>
          </AlertDialogHeader>
          <AlertDialogBody scrollEnabled={false} className="mt-3 mb-4">
            <VStack space='md'>
              <Text size="sm" >
                Please enter the odometer and confirm that you wish to proceed.
              </Text>
              <Text size="md" className="text-secondary-900 font-medium">Odometer Reading</Text>
              <Input
                size='lg'
                className='bg-secondary-300 border-0 rounded-2xl'>
                <InputSlot className="pl-3">
                  <InputIcon
                    as={ArrowDownUp}
                    className="text-secondary-500"
                  />
                </InputSlot>
                <InputField
                  maxLength={10}
                  placeholder="Current mileage"
                  type="text"
                  keyboardType='numeric'
                  value={odometerReading}
                  onChangeText={setOdometerReading}
                  returnKeyType="done"

                />
                <InputSlot className="pr-3">
                  <Text className='text-secondary-700'>km</Text>
                </InputSlot>
              </Input>
            </VStack>
          </AlertDialogBody>
          <AlertDialogFooter className="">
            <Button
              variant="outline"
              action="secondary"
              onPress={handleClose}
              size="md"
            >
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button
              size="md"
              onPress={() => updateOdometer(currentVehicle.id, odometerReading)}
            >
              <ButtonText className='text-secondary-100'>Done</ButtonText>
            </Button>

          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </>
  )
}

export default Vehicle

