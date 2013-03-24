/**
 * project: ...
 * author: thomas diewald
 * date:   14.02.12
 */

//TODO: check if values by reference is problematic
var DwAxis = {
  X: [1, 0, 0],
  Y: [0, 1, 0],
  Z: [0, 0, 1]
}

var DwRotationOrder = {};

DwRotationOrder.XYZ = [DwAxis.X, DwAxis.Y, DwAxis.Z];
DwRotationOrder.XZY = [DwAxis.X, DwAxis.Z, DwAxis.Y];
DwRotationOrder.YXZ = [DwAxis.Y, DwAxis.X, DwAxis.Z];
DwRotationOrder.YZX = [DwAxis.Y, DwAxis.Z, DwAxis.X];
DwRotationOrder.ZXY = [DwAxis.Z, DwAxis.X, DwAxis.Y];
DwRotationOrder.ZYX = [DwAxis.Z, DwAxis.Y, DwAxis.X];
DwRotationOrder.XYX = [DwAxis.X, DwAxis.Y, DwAxis.X];
DwRotationOrder.XZX = [DwAxis.X, DwAxis.Z, DwAxis.Z];
DwRotationOrder.YXY = [DwAxis.Y, DwAxis.X, DwAxis.Y];
DwRotationOrder.YZY = [DwAxis.Y, DwAxis.Z, DwAxis.Y];
DwRotationOrder.ZXZ = [DwAxis.Z, DwAxis.X, DwAxis.Z];
DwRotationOrder.ZYZ = [DwAxis.Z, DwAxis.Y, DwAxis.Z];



//public static final RotationOrder XYZ = new RotationOrder("XYZ", Vector3D.plusI,Vector3D.plusJ, Vector3D.plusK);
//public static final RotationOrder XZY = new RotationOrder("XZY", Vector3D.plusI,Vector3D.plusK, Vector3D.plusJ);
//public static final RotationOrder YXZ = new RotationOrder("YXZ", Vector3D.plusJ,Vector3D.plusI, Vector3D.plusK);
//
//public static final RotationOrder YZX = new RotationOrder("YZX", Vector3D.plusJ,Vector3D.plusK, Vector3D.plusI);
//public static final RotationOrder ZXY = new RotationOrder("ZXY", Vector3D.plusK,Vector3D.plusI, Vector3D.plusJ);
//public static final RotationOrder ZYX = new RotationOrder("ZYX", Vector3D.plusK,Vector3D.plusJ, Vector3D.plusI);
//
//public static final RotationOrder XYX = new RotationOrder("XYX", Vector3D.plusI,Vector3D.plusJ, Vector3D.plusI);
//public static final RotationOrder XZX = new RotationOrder("XZX", Vector3D.plusI,Vector3D.plusK, Vector3D.plusI);
//public static final RotationOrder YXY = new RotationOrder("YXY", Vector3D.plusJ,Vector3D.plusI, Vector3D.plusJ);
//
//public static final RotationOrder YZY = new RotationOrder("YZY", Vector3D.plusJ,Vector3D.plusK, Vector3D.plusJ);
//public static final RotationOrder ZXZ = new RotationOrder("ZXZ", Vector3D.plusK,Vector3D.plusI, Vector3D.plusK);
//public static final RotationOrder ZYZ = new RotationOrder("ZYZ", Vector3D.plusK,Vector3D.plusJ, Vector3D.plusK);
