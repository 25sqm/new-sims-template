import React, { useState, useEffect } from "react";
import { useModals } from "@mantine/modals";

interface DeviceData {
  device_type_ID: number;
  device_code: string;
  client_location_area_ID: number;
  client_location_ID: number;
  date_deployed: string;
  time_deployed: string;
  date_removed: string;
  user_ID: number;
  f_m: number;
  f_t: number;
  f_w: number;
  f_th: number;
  f_f: number;
  f_sat: number;
  f_sun: number;
  top_pos: number;
  left_pos: number;
}

interface ModalProps {
  modalForm: React.ReactNode;
  modalTitle: String;
}

export const Modal = ({ modalForm, modalTitle }: ModalProps) => {
  //     const modals = useModals();
  //     const modalID = modals.openModal({
  //         title: modalTitle,
  //         children: modalForm,
  //   })
};
