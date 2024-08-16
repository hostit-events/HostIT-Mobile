import { fetchApi } from "app/services/api";
import { Instance, SnapshotOut, types, flow } from "mobx-state-tree";

const AttendeeModel = types.model("Attendee", {
    id: types.number,
    name: types.string,
    email: types.string,
    phone:types.string,
    country: types.string,
    location: types.string,
    gender: types.string,
    telegramusername:types.string,
    xhandle: types.string,
    role: types.string,
});

export const AttendeesStoreModel = types
    .model("AttendeesStore")
    .props({
        attendees: types.optional(types.array(AttendeeModel), []),
        fetchingStatus: types.optional(types.enumeration(["idle", "pending", "done", "error"]), "idle"),
    })
    .views((store) => ({
        get allAttendees() {
            return store.attendees;
        },
        get totalAttendees() {
            return store.attendees.length;
        },
    }))
    .actions((store) => ({
        fetchAllAttendees: flow(function* () {
            store.fetchingStatus = "pending";
            try {
                const response = yield fetchApi.apisauce.get("api/general-registrations/");
                if (response.ok && response.data) {
                    store.attendees = response.data.map((item: any) => AttendeeModel.create(item));
                    store.fetchingStatus = "done";
                } else {
                    console.error("Error fetching data:", response.problem);
                    store.fetchingStatus = "error";
                }
            } catch (error) {
                console.error("Error:", error);
                store.fetchingStatus = "error";
            }
        }),
        clearAttendees() {
            store.attendees.clear();
            store.fetchingStatus = "idle";
        },
    }))
    .actions((store) => ({
        afterCreate() {
            store.fetchAllAttendees(); 
        },
    }));

export interface AttendeesStore extends Instance<typeof AttendeesStoreModel> {}
export interface AttendeesStoreSnapshot extends SnapshotOut<typeof AttendeesStoreModel> {}

// @demo remove-file
